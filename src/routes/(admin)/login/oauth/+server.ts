import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/data/db';
import type { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export async function GET({ cookies, url, locals }) {
	// get search params

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

	console.log(tokenData);

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

	console.log(userDataResponse);

	if (userDataResponse.status !== 200) {
	}

	const userData = await userDataResponse.json();

	// throw redirect(302, '/admin');

	// create user in db if it doesn't exist
	const userRecord = await db.user.findUnique({
		where: {
			email: userData.email
		}
	});
	if (!userRecord) {
		console.log('User not found, not authorized');
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
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
}
