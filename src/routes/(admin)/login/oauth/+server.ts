import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/data/db';
import type { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export async function GET({ cookies, url, locals }) {
	// get search params
	try {
		const code = url.searchParams.get('code');
		const client_id = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
		const redirect_uri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
		const client_secret = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_SECRET;

		console.log('code', code);
		console.log('client_id', client_id);
		console.log('redirect_uri', redirect_uri);
		console.log('client_secret', client_secret);

		if (!code) {
			throw fail(400, { message: 'No code provided' });
		}

		// fetch tokens from google

		const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				code: code,
				client_id: client_id,
				client_secret: client_secret,
				redirect_uri: redirect_uri,
				grant_type: 'authorization_code'
			})
		});

		const tokenData = await tokenResponse.json();

		// // fetch user data from google

		if (!tokenData.error) {
			throw fail(400, { message: tokenData.error_description });
		}

		if (!tokenData.access_token) {
			throw fail(400, { message: 'No access_token provided' });
		}

		if (!tokenData.refresh_token) {
			throw fail(400, { message: 'No refresh_token provided' });
		}

		const userDataResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
			headers: {
				Authorization: `Bearer ${tokenData.access_token}`
			}
		});

		if (userDataResponse.status !== 200) {
			throw fail(400, { message: 'Could not fetch user data' });
		}

		const userData = await userDataResponse.json();

		if (!userData.email) {
			throw fail(400, { message: 'No email provided' });
		}

		console.log(userData, tokenData);

		// throw redirect(302, '/admin');

		let userRecord: User | null = null;
		// create user in db if it doesn't exist
		const user = await db.user.findUnique({
			where: {
				email: userData.email
			}
		});
		if (!user) {
			const newUser = await db.user.create({
				data: {
					email: userData.email,
					name: userData.name,
					avatar: userData.picture,
					refreshToken: tokenData.refresh_token
				}
			});

			userRecord = newUser;
		}
		if (user) {
			userRecord = user;
		}

		if (userRecord === undefined || userRecord === null) {
			throw fail(500, { message: 'User could not be created' });
		}

		// create accesss_token jwt
		const access_token = jwt.sign(
			{
				id: userRecord.id,
				email: userRecord.email,
				avatar: userRecord.avatar,
				name: userRecord.name
			},
			import.meta.env.VITE_JWT_SECRET,
			{
				expiresIn: '1h'
			}
		);

		if (!access_token) {
			throw fail(500, { message: 'Access token could not be created' });
		}

		// store refresh_token in db
		await db.user.update({
			where: {
				id: userRecord.id
			},
			data: {
				refreshToken: tokenData.refresh_token
			}
		});

		// set cookies and locals
		cookies.set('access_token', access_token, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60 // 1 hour
		});
		cookies.set('refresh_token', tokenData.refresh_token, {
			path: '/',
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		locals.user = {
			id: userRecord.id,
			email: userRecord.email,
			avatar: userRecord.avatar,
			name: userRecord.name
		};

		// redirect
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/admin'
			}
		});
	} catch (error) {
		console.log(error);
		throw fail(500, { message: 'Something went wrong' });
	}
}
