import type { PageServerLoad, Actions, Action } from './$types';
import Post from '@prisma/client';
import { db } from '$lib/data/db';
import { fail } from '@sveltejs/kit';
import { del, put } from '@vercel/blob';

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
	// check if locals.user exists

	if (!locals.user) {
		throw fail(401, { message: 'Unauthorized' });
	}
	console.log('locals.user', locals.user);

	const id = params.slug;
	// check if the slug is a valid post
	const draft = await db.draft.findUnique({
		where: {
			id: id
		}
	});
	console.log('draft', draft);
	if (!draft) {
	} else {
		return { draft };
	}
};
