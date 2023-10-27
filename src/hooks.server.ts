import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { db } from '$lib/data/db';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = event.cookies;
	let access_token = cookies.get('access_token');
	const refresh_token = cookies.get('refresh_token');

	if (!access_token && !refresh_token) {
		event.locals.user = null;
		return resolve(event);
	}

	if (access_token) {
		try {
			jwt.verify(access_token, import.meta.env.VITE_JWT_SECRET);

			const decoded: any = jwt.decode(access_token);

			if (!decoded) {
				event.locals.user = null;
				return resolve(event);
			}

			// set locals.user
			event.locals.user = {
				id: decoded.id,
				email: decoded.email,
				avatar: decoded.avatar,
				name: decoded.name
			};
		} catch (err) {
			if (err.name === 'TokenExpiredError') {
				console.log('Token expired, trying to refresh');

				await getAccessTokenFromRefreshToken(refresh_token as string);
			}
		}
	}

	if (refresh_token && !access_token) {
		await getAccessTokenFromRefreshToken(refresh_token as string);
	}

	async function getAccessTokenFromRefreshToken(refreshToken: string) {
		if (refreshToken) {
			const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
					client_secret: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_SECRET,
					refresh_token: refreshToken,
					grant_type: 'refresh_token'
				})
			});

			if (tokenResponse.ok) {
				const tokenData = await tokenResponse.json();
				const user = await db.user.findUnique({
					where: {
						refreshToken: refreshToken
					}
				});
				if (!user) {
					console.error('No user found with this refresh token');
					event.locals.user = null;
					return resolve(event);
				}
				access_token = jwt.sign(
					{
						id: user.id,
						email: user.email,
						avatar: user.avatar,
						name: user.name
					},
					import.meta.env.VITE_JWT_SECRET,
					{
						expiresIn: '1h'
					}
				);
				// Update the cookie with the new JWT
				cookies.set('access_token', access_token, {
					path: '/',
					httpOnly: true,
					maxAge: 60 * 60 // 1 hour
				});

				// set locals.user
				event.locals.user = {
					id: user.id,
					email: user.email,
					avatar: user.avatar,
					name: user.name
				};
			} else {
				console.error('Failed to refresh Google token');
				event.locals.user = null;
			}
		}
	}
	return resolve(event);
};
