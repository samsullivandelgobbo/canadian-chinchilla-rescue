import { db } from '$lib/data/db';

export async function GET({ request }) {
	try {
		const posts = await db.post.findMany({
			include: {
				author: true
			}
		});

		return new Response(JSON.stringify(posts), {
			headers: {
				'content-type': 'application/json'
			}
		});
	} catch (error) {
		return new Response('error', {
			status: 500,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
}
