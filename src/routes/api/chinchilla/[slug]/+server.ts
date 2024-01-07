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
	try {
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

		console.log(name, age, color, gender, description, friendly, bondedWith);

		// remove all existing photos

		// check if any photos arent base64 strings
		const base64Photos = photos.filter((photo) => {
			return photo.startsWith('data:image');
		});

		console.log(`Found ${base64Photos.length} base64 photos`);

		const urlToBase64 = async (url) => {
			const response = await fetch(url);
			const arrayBuffer = await response.arrayBuffer(); // get ArrayBuffer from response
			const buffer = Buffer.from(arrayBuffer); // convert ArrayBuffer to Buffer
			return buffer.toString('base64'); // convert buffer to base64 string
		};

		// convert image URLs to base64 strings on server
		const newBase64Photos = await Promise.all(
			photos.map(async (photo) => {
				if (photo.startsWith('data:image')) {
					return photo;
				} else {
					const base64String = await urlToBase64(photo);
					return `data:image/jpeg;base64,${base64String}`; // add the base64 prefix
				}
			})
		);

		console.log(`Converted ${newBase64Photos.length} image URLs to base64 strings`);

		// remove existing photos from vercel blob

		const existingPhotos = await db.chinchilla.findUnique({
			where: {
				id: parseInt(slug)
			},
			select: {
				photos: true
			}
		});

		const existingPhotoUrls = existingPhotos?.photos;

		console.log(`Found ${existingPhotoUrls?.length} existing photos`);

		if (existingPhotoUrls && existingPhotoUrls.length > 0) {
			await del(existingPhotoUrls);
			console.log(`Deleted ${existingPhotoUrls?.length} existing photos`);
		}

		base64Photos.push(...newBase64Photos);

		console.log(`Found ${base64Photos.length} total photos`);

		// upload new photos to vercel blob
		const newPhotos = await Promise.all(
			base64Photos.map(async (photo) => {
				const fileType = photo.split(';')[0].split('/')[1];
				const base64Data = photo.split(',')[1];

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

		console.log(`Uploaded ${newPhotos.length} new photos`);

		// add the chinchilla to the database

		const chinchilla = await db.chinchilla.update({
			where: {
				id: parseInt(slug)
			},
			data: {
				name: name,
				description: description,
				age: age,
				friendly: friendly,
				photos: newPhotos
			}
		});

		console.log(`Updated chinchilla ${chinchilla.id}`);
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
			},
			status: 400
		});
	}
}
