import type { PageServerLoad, Actions, Action } from './$types';
import Post from '@prisma/client';
import { db } from '$lib/data/db';

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
	// load all posts from the db
	const posts = await db.post.findMany();

	const publishedPosts = posts.filter((post) => post.published);
	const unpublishedPosts = posts.filter((post) => !post.published);

	return {
		publishedPosts,
		unpublishedPosts
	};
};
