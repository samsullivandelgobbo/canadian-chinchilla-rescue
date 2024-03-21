import type { PageServerLoad, Actions, Action } from './$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/data/db';
import { put, del } from '@vercel/blob';
import { message, superValidate, withFiles } from 'sveltekit-superforms/server';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import type { Chinchilla } from '@prisma/client';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

async function addChinchilla(event: any) {
	// validate the form data

	const form = await superValidate(event, zod(formSchema));

	try {
		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		console.log('form', form.data);
		if (form.data.id) {
			const updatedChinchilla = await updateChinchilla(form.data);
			console.log('updatedChinchilla', updatedChinchilla);

			message(form, {
				success: 'Chinchilla updated'
			});
			return withFiles({ form });
		}

		// handle image uploads
		const image = form.data.image;
		let imageUrl = null;

		if (image && image.size > 0) {
			const fileExtension = image.name.split('.').pop();
			const { url } = await put(
				`chinchilla-${form.data.name}-${Date.now()}.${fileExtension}`,
				image,
				{
					access: 'public'
				}
			);
			imageUrl = url;
		}

		// add the chinchilla to the database
		const chinchilla = await db.chinchilla.create({
			data: {
				name: form.data.name,
				gender: form.data.gender as 'MALE' | 'FEMALE',
				age: form.data.age,
				color: form.data.color,
				description: form.data.description,
				friendly: form.data.friendly,
				photos: imageUrl ? [imageUrl] : []
			}
		});

		message(form, {
			success: 'Chinchilla added'
		});
		return withFiles({ form });
	} catch (error) {
		console.error(error);
		message(form, {
			error: 'An error occurred'
		});

		return fail(400, withFiles({ form }));
	}
}

export const actions: Actions = {
	default: addChinchilla
};

async function updateChinchilla(data) {
	try {
		const existingChinchilla = await db.chinchilla.findUnique({
			where: {
				id: parseInt(data.id)
			}
		});

		if (!existingChinchilla) {
			throw Error('Chinchilla not found');
		}

		let imageUrl = null;

		if (data.image && data.image.size > 0) {
			await Promise.all(
				existingChinchilla.photos.map((photo) => {
					return del(photo);
				})
			);

			const image = data.image;
			const fileExtension = image.name.split('.').pop();
			const { url } = await put(`chinchilla-${data.name}-${Date.now()}.${fileExtension}`, image, {
				access: 'public'
			});
			imageUrl = url;
		}

		// update the chinchilla
		const updatedChinchilla = await db.chinchilla.update({
			where: {
				id: parseInt(data.id)
			},
			data: {
				name: data.name,
				gender: data.gender as Chinchilla['gender'],
				age: data.age,
				color: data.color,
				description: data.description,
				friendly: data.friendly,
				photos: imageUrl ? [imageUrl] : undefined
			}
		});

		if (!updatedChinchilla) {
			throw Error('Chinchilla not updated');
		}

		console.log('updatedChinchilla', updatedChinchilla);

		return updatedChinchilla;
	} catch (error) {
		console.error(error);
		message(data, {
			error: 'An error occurred'
		});
	}
}
