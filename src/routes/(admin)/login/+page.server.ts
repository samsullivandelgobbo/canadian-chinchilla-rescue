import type { Actions, Action, PageServerLoad } from './$types';

import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ request, params, cookies, locals }) => {
	const client_id = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
	const redirect_uri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
	const scope =
		'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
	const response_type = 'code';
	const access_type = 'offline';

	throw redirect(
		302,
		`https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}&access_type=${access_type}&include_granted_scopes=true`
	);
};
