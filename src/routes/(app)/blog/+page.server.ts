import type { PageServerLoad, Action, Actions } from './$types';
import Post from '@prisma/client';
import { db } from '$lib/data/db';

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
	const posts = await db.post.findMany({
		include: {
			author: true
		}
	});
	return {
		posts
	};
};
