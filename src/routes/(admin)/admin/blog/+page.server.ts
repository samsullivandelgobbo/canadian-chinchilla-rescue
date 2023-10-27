import type { PageServerLoad, Actions, Action } from './$types';
import Post from '@prisma/client';
import { db } from '$lib/data/db';

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
	// load all posts from the db
	const posts = await db.post.findMany({
		include: {
			author: true
		}
	});

	return { posts };
};
