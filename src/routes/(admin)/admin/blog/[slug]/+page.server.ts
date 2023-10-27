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
	const published = JSON.parse(formData.get('published') as string);
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
	let slug = params.slug;
	slug = slug
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)+/g, '')
		.replace(/\s+/g, '-')
		.toLowerCase();

	// save the post to the db

	const post = await db.post.findUnique({
		where: {
			slug: slug
		}
	});

	if (post && post.image) {
		// delete the old image
		await del(post.image);

		// upload the new image
		const { url } = await put('blog/' + slug, image, { access: 'public' });

		// update the post
		const updatedPost = await db.post.update({
			where: {
				slug: slug
			},
			data: {
				title: title,
				slug: slug,
				content: content,
				description: description,
				image: url,
				published: published,
				category: category
			}
		});
		if (updatedPost) {
			return { post: updatedPost };
		}
	} else if (!post) {
		console.log('post does not exist');
		// create a new post
		const { url } = await put('blog/' + slug, image, { access: 'public' });

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
			return { post: newPost };
		} else {
			return fail(500, { message: 'Failed to create new post' });
		}
	}
};

export const actions: Actions = {
	default: savePost
};
