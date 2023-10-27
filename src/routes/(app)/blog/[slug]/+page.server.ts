import type { PageServerLoad, Action, Actions } from './$types';
import Post from '@prisma/client';
import { db } from '$lib/data/db';

export const load: PageServerLoad = async ({ request, params }) => {
	const slug = params.slug;

	const post = await db.post.findUnique({
		where: {
			slug: slug
		},
		include: {
			author: true
		}
	});
	return {
		post
	};

	// fetch post from db
};
