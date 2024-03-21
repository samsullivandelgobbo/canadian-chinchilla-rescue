import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, locals, cookies }) => {
	// check if locals.user exists
	if (!locals.user) {
		redirect(302, '/');
	}
};
