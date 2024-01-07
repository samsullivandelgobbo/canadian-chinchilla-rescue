import { db } from '$lib/data/db';

export async function DELETE({ request, params, locals }) {
	if (!locals.user) {
		return new Response('Not authorized', {
			status: 401,
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	const id = params.slug;

	if (!id) {
		return new Response('ID is required', {
			status: 400,
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	try {
		const post = await db.post.delete({
			where: {
				id: id
			}
		});

		return new Response(JSON.stringify(post), {
			status: 200,
			headers: {
				'content-type': 'application/json'
			}
		});
	} catch (error) {
		return new Response(JSON.stringify(error), {
			status: 500,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
}
