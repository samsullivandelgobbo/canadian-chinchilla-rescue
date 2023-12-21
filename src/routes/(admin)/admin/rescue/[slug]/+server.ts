import { db } from '$lib/data/db.js';
import { del } from '@vercel/blob';
export async function DELETE({ request, locals, cookies, params }) {
	try {
		// get route slug
		console.log(params);
		const { slug } = params;

		console.log(slug);
		// delete the old photos
		const oldChinchilla = await db.chinchilla.findUnique({
			where: {
				id: parseInt(slug)
			}
		});

		if (!oldChinchilla) {
			throw Error('Chinchilla not found');
		}

		// delete the old photos
		const oldPhotos = oldChinchilla.photos;

		await del(oldPhotos);

		// delete the chinchilla

		await db.chinchilla.delete({
			where: {
				id: parseInt(slug)
			}
		});

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: error }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
