import { db } from '$lib/data/db';
import { put, del } from '@vercel/blob';

export async function GET({ params }) {
	const chinchillas = await db.chinchilla.findMany();

	return new Response(JSON.stringify(chinchillas), {
		headers: {
			'content-type': 'application/json'
		}
	});
}

export async function POST({ params, request }) {
	try {
		const body = await request.json();

		console.log(body);

		const name = body.name;
		const age = parseInt(body.age);
		const color = body.color;
		const gender = body.gender;
		const description = body.description;
		const friendly = body.friendly;
		const bondedWith = body.bondedWith;
		const photos = body.photos;

		// get filetype from base64 string

		// handle image uploads

		// create the new photos
		const imageUrls = await Promise.all(
			photos.map(async (image) => {
				const fileType = image.split(';')[0].split('/')[1];
				const base64Data = image.split(',')[1];

				// Convert Base64 string to Buffer
				const buffer = Buffer.from(base64Data, 'base64');

				const { url } = await put(
					// keep file extension
					name + '-' + Date.now().toString() + '.' + fileType,

					// remove the base64 prefix
					buffer,
					{
						access: 'public'
					}
				);
				return url;
			})
		);

		// add the chinchilla to the database
		const chinchilla = await db.chinchilla.create({
			data: {
				name: name,
				age: age,
				gender: gender,
				photos: imageUrls,
				color: color,
				description: description,
				friendly: friendly,
				bondedWith: {
					connect: bondedWith ? bondedWith : []
				}
			}
		});

		console.log(chinchilla);

		if (!chinchilla) {
			throw new Error('Chinchilla not created');
		}

		return new Response(JSON.stringify(chinchilla), {
			headers: {
				'content-type': 'application/json'
			}
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify(error), {
			headers: {
				'content-type': 'application/json'
			}
		});
	}
}
