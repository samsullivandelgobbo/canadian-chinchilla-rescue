import { db } from '$lib/data/db';
import { put } from '@vercel/blob';

export async function POST({ request, cookies, locals }) {
	const body = await request.json();

	// validate fields
	if (!locals.user) {
		return new Response('Not authorized', {
			status: 401,
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	const userId = locals.user.id;

	console.log('userId', userId);

	if (!userId) {
		return new Response('User ID is required', {
			status: 400,
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	const { title, content, description, tags, coverPhoto } = body;

	if (!title || !content || !description || !coverPhoto) {
		return new Response('Title, content, description, and cover photo are required', {
			status: 400,
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	try {
		// handle image upload
		const fileType = coverPhoto.split(';')[0].split('/')[1];
		const base64Data = coverPhoto.split(',')[1];

		console.log(fileType);

		// Convert Base64 string to Buffer
		const buffer = Buffer.from(base64Data, 'base64');

		const { url } = await put(
			// keep file extension
			title.replace(/\s/g, '-').toLowerCase() + new Date().getTime() + '.' + fileType,

			// remove the base64 prefix
			buffer as any,
			{
				access: 'public'
			}
		);

		console.log(`Image uploaded successfully: ${url}`);

		if (!url) {
			return new Response('Error uploading image', {
				status: 500,
				headers: {
					'content-type': 'application/json'
				}
			});
		}

		const post = await db.post.create({
			data: {
				title,
				content,
				description,
				tags,
				image: url,
				authorId: userId
			}
		});

		console.log(`Post ${post.id} created successfully: ${post.title}}`);

		if (!post) {
			return new Response('Error creating post', {
				status: 500,
				headers: {
					'content-type': 'application/json'
				}
			});
		}

		return new Response(JSON.stringify(post), {
			status: 200,
			headers: {
				'content-type': 'application/json'
			}
		});
	} catch (error) {
		console.log('error', error);
		return new Response(JSON.stringify(error), {
			status: 500,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
}
