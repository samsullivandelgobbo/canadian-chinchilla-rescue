import { db } from '$lib/data/db';
import { put, del } from '@vercel/blob';

export async function GET({ params }) {
	const { slug } = params;

	const chinchilla = await db.chinchilla.findUnique({
		where: {
			id: parseInt(slug)
		}
	});

	return new Response(JSON.stringify(chinchilla), {
		headers: {
			'content-type': 'application/json'
		}
	});
}

export async function DELETE({ params }) {
	try {
		const { slug } = params;

		// delete the old photos
		const oldChinchilla = await db.chinchilla.findUnique({
			where: {
				id: parseInt(slug)
			}
		});

		if (!oldChinchilla) {
			throw Error('Chinchilla not found');
		}

		const oldPhotos = oldChinchilla.photos;

		if (oldPhotos.length > 0) {
			console.log(oldPhotos);

			await del(oldPhotos);
		}

		const chinchilla = await db.chinchilla.delete({
			where: {
				id: parseInt(slug)
			}
		});

		return new Response(JSON.stringify('success'), {
			headers: {
				'content-type': 'application/json'
			}
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify(error), {
			headers: {
				'content-type': 'application/json'
			},
			status: 400
		});
	}
}

export async function POST({ params, request }) {
	const { slug } = params;
	const body = await request.json();

	const id = slug;
	const name = body.name;
	const age = parseInt(body.age);
	const color = body.color;
	const gender = body.gender;
	const description = body.description;
	const friendly = body.friendly;
	const bondedWith = body.bondedWith;
	const photos = body.photos;

	return new Response(JSON.stringify(''), {
		headers: {
			'content-type': 'application/json'
		}
	});
}
