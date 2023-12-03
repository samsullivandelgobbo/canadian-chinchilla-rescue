import type { PageServerLoad, Actions, Action } from './$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/data/db';
import { put, del } from '@vercel/blob';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from './schema';

export const load: PageServerLoad = async (event) => {
	try {
		const chinchillas = await db.chinchilla.findMany();

		return {
			chinchillas,
			form: superValidate(formSchema)
		};
	} catch (error) {
		throw fail(400, {});
	}
};

async function addChinchilla(event) {
	const formData = await event.request.formData();

	try {
		// validate the form data

		const form = await superValidate(formData, formSchema);
		if (!form.valid) {
			console.log(form.errors);
			throw fail(400, {
				form
			});
		}

		const files = formData.getAll('images');
		console.log(files);

		console.log(form);

		const imageUrls = await Promise.all(
			files.map(async (image) => {
				const { url } = await put(image.name, image, {
					access: 'public'
				});
				return url;
			})
		);

		// add the chinchilla to the database
		const chinchilla = await db.chinchilla.create({
			data: {
				...form.data,
				photos: imageUrls
			}
		});

		console.log(chinchilla);

		return {
			form
		};
	} catch (error) {
		console.log(error);
		// throw fail(400, { form });
	}
}

export const actions: Actions = {
	default: addChinchilla
};
