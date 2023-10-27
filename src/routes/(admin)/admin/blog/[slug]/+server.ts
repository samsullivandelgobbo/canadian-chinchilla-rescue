import { db } from '$lib/data/db';
import { fail } from '@sveltejs/kit';
import { del } from '@vercel/blob';

export async function DELETE({ request, params, cookies, locals }) {
	const slug = params.slug;
	const post = await db.post.findUnique({
		where: {
			slug: slug
		}
	});
	if (!post) {
		throw fail(404, { message: 'Post not found' });
	} else {
		const urlToDelete = post.image as string;
		await del(urlToDelete);

		await db.post.delete({
			where: {
				slug: slug
			}
		});
		return new Response(null, { status: 200 });
	}
}
