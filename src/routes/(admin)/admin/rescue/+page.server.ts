// import type { PageServerLoad, Actions, Action } from './$types';
// import { fail } from '@sveltejs/kit';
// import { db } from '$lib/data/db';
// import { put, del } from '@vercel/blob';
// import { superValidate } from 'sveltekit-superforms/server';

// // export const load: PageServerLoad = async (event) => {
// // 	try {
// // 		const chinchillas = await db.chinchilla.findMany();

// // 		return {
// // 			props: {
// // 				initialChinchillas: chinchillas
// // 			}
// // 		};
// // 	} catch (error) {
// // 		throw fail(400, {});
// // 	}
// // };

// async function addChinchilla(event) {
// 	const formData = await event.request.formData();

// 	try {
// 		// validate the form data

// 		const form = await superValidate(formData, formSchema);
// 		if (!form.valid) {
// 			console.log(form.errors);
// 			throw fail(400, {
// 				form
// 			});
// 		}

// 		const files = formData.getAll('images');
// 		console.log(files);

// 		console.log(form);

// 		// handle updating chinchilla
// 		if (form.data.updateChinchillaId) {
// 			// delete the old photos
// 			const oldChinchilla = await db.chinchilla.findUnique({
// 				where: {
// 					id: form.data.updateChinchillaId
// 				}
// 			});

// 			if (!oldChinchilla) {
// 				throw Error('Chinchilla not found');
// 			}

// 			const oldPhotos = oldChinchilla.photos;

// 			// check if any images were uploaded

// 			await del(oldPhotos);

// 			// create the new photos
// 			const imageUrls = await Promise.all(
// 				files.map(async (image) => {
// 					const { url } = await put(image.name, image, {
// 						access: 'public'
// 					});
// 					return url;
// 				})
// 			);
// 			console.log(form.data.bondedWith);

// 			// update the chinchilla
// 			const updatedChinchilla = await db.chinchilla.update({
// 				where: {
// 					id: form.data.updateChinchillaId
// 				},
// 				data: {
// 					name: form.data.name,
// 					gender: form.data.gender,
// 					age: form.data.age,
// 					color: form.data.color,
// 					description: form.data.description,
// 					friendly: form.data.friendly,
// 					photos: imageUrls,
// 					bondedWith: {
// 						connect: form.data.bondedWith ? form.data.bondedWith : []
// 					}
// 				}
// 			});

// 			return {
// 				updatedChinchilla
// 			};
// 		}

// 		const imageUrls = await Promise.all(
// 			files.map(async (image) => {
// 				const { url } = await put(image.name, image, {
// 					access: 'public'
// 				});
// 				return url;
// 			})
// 		);

// 		// add the chinchilla to the database
// 		const chinchilla = await db.chinchilla.create({
// 			data: {
// 				name: form.data.name,
// 				gender: form.data.gender,
// 				age: form.data.age,
// 				color: form.data.color,
// 				description: form.data.description,
// 				friendly: form.data.friendly,
// 				bondedWith: {
// 					connect: form.data.bondedWith ? form.data.bondedWith : []
// 				},

// 				photos: imageUrls
// 			}
// 		});

// 		console.log(chinchilla);

// 		return {
// 			form
// 		};
// 	} catch (error) {
// 		console.log(error);
// 		// throw fail(400, { form });
// 	}
// }

// export const actions: Actions = {
// 	default: addChinchilla
// };
