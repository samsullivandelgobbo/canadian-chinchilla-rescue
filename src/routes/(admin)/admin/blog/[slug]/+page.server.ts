import type { PageServerLoad, Actions, Action } from './$types';
import Post from '@prisma/client';
import { db } from '$lib/data/db';
import { fail } from '@sveltejs/kit';
import { put } from '@vercel/blob';

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
	// check if locals.user exists

	if (!locals.user) {
		throw fail(401, { message: 'Unauthorized' });
	}
	console.log('locals.user', locals.user);

	const slug = params.slug;
	// check if the slug is a valid post
	const post = await db.post.findUnique({
		where: {
			slug: slug
		}
	});
	if (!post) {
		return;
	} else {
		return { post };
	}
};

const savePost: Action = async ({ params, request, locals }) => {
	const formData = await request.formData();
	const title = formData.get('title') as string;
	const content = formData.get('content') as string;
	const published = parseInt(formData.get('published') as string) === 1 ? true : false;
	const image = formData.get('file-upload');
	const description = formData.get('description') as string;
	const category = formData.get('category') as string;

	console.log('image', image);
	console.log('title', title);
	console.log('content', content);
	console.log('published', published);
	console.log('description', description);
	console.log('category', category);

	if (!title || !content || !description || !image || !category) {
		return fail(400, { message: 'Please fill out all required fields' });
	}
	const slug = params.slug;

	const { url } = await put('blog/' + slug, image, { access: 'public' });

	// save the post to the db

	const post = await db.post.findUnique({
		where: {
			slug: slug
		}
	});
	if (!post) {
		// create a new post
		const newPost = await db.post.create({
			data: {
				title: title,
				slug: slug,
				content: content,
				description: description,
				image: url,
				published: published,
				category: category,
				author: {
					connect: {
						id: locals.user!.id
					}
				}
			}
		});

		if (newPost) {
			console.log('newPost', newPost);
			return { post: newPost };
		} else {
			return fail(500, { message: 'Database could not save post, please try again later' });
		}
	}
};

export const actions: Actions = {
	default: savePost
};
