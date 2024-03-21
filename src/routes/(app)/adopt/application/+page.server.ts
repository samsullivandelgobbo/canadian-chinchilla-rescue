import type { PageServerLoad, Actions, Action } from './$types';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import { applicationSchema } from './schema';
import { put } from '@vercel/blob';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib/data/db';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const form = await superValidate(formData, zod(applicationSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		console.log('Form Submitted', form.data);

		try {
			const image = form.data.cageImage;
			let cageImageUrl = null;
			if (image && image.size > 0) {
				// read the file contents

				const fileExt = image.name.split('.').pop();
				// save the buffer to vercel blob
				const { url } = await put(
					`rescue-applications-${form.data.email}-cage-${Date.now()}.${fileExt}`,
					image,
					{
						access: 'public'
					}
				);

				cageImageUrl = url;
			}

			// check if the user has already submitted an application within the last 30 days
			const existingApplication = await db.rescueApplication.findFirst({
				where: {
					email: form.data.email,
					createdAt: {
						gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
					}
				}
			});

			console.log('existingApplication', existingApplication);
			if (existingApplication) {
				message(form, {
					warning:
						'You have already submitted an application within the last 30 days. Please wait before submitting another application.'
				});
				return {
					form
				};
			}

			const application = await db.rescueApplication.create({
				data: {
					firstName: form.data.firstName,
					lastName: form.data.lastName,
					age: form.data.age,
					email: form.data.email,
					parentFirstName: form.data.parentFirstName,
					parentLastName: form.data.parentLastName,
					parentEmail: form.data.parentEmail,

					hasCage: form.data.hasCage,
					cageType: form.data.cageType,
					cageImage: cageImageUrl,

					hasChildren: form.data.hasChildren,
					hasAllergies: form.data.hasAllergies,
					hasPets: form.data.hasPets,
					petTypes: form.data.petTypes ? form.data.petTypes : [],
					hasChinchillaVet: form.data.hasChinchillaVet,
					hasChinchilla: form.data.hasChinchilla,
					chinchillaName: form.data.chinchillaName,
					chinchillaAge: form.data.chinchillaAge,
					chinchillaGender: form.data.chinchillaGender as 'MALE' | 'FEMALE',
					chinchillaFriendly: form.data.chinchillaFriendly,
					willQuarantine: form.data.willQuarantine,
					ownedChinchillas: form.data.ownedChinchillas,
					ownedChinchillasCount: form.data.ownedChinchillasCount,
					surrenderedPet: form.data.surrenderedPets,
					surrenderedPetReason: form.data.surrenderedPetReason,
					whyChinchilla: form.data.whyChinchilla
				}
			});

			console.log('Application created', application);

			message(form, { success: 'Success! Your application has been submitted.' });

			// send email using sendgrid api
			const userEmailSuccess = await sendUserConfirmEmail(
				form.data.email,
				form.data.firstName + ' ' + form.data.lastName
			);

			const adminEmailSuccess = await sendAdminEmail();

			return {
				form
			};
		} catch (error) {
			message(form, {
				error: 'There was an error submitting your application. Please try again later.'
			});
			console.log(error);
		}
		return {
			form
		};
	}
};

async function sendAdminEmail() {
	const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${import.meta.env.VITE_SENDGRID_API_KEY}`
		},
		body: JSON.stringify({
			personalizations: [
				{
					to: [
						{
							email: 'canadianchinchillarescue@gmail.com',
							name: 'Canadian Chinchilla Rescue'
						},
						{
							email: 'sam.sullivan150@gmail.com',
							name: 'Sam Sullivan'
						}
					],
					subject: 'New adoption application!'
				}
			],
			from: {
				email: 'no-reply@canadianchinchilla.ca',
				name: 'Canadian Chinchilla Rescue'
			},
			content: [
				{
					type: 'text/html',
					value: `<p>There is a new adoption application! Please <a href="https://canadianchinchilla.ca/login">login</a> to the admin panel to view it.</p>`
				}
			]
		})
	});

	if (res.status === 202) {
		console.log('Admin email sent');
		return true;
	} else {
		console.log(`Error sending admin email: ${res.status} ${res.statusText}`);
		return false;
	}
}

async function sendParentEmail(email: string, name: string) {}

async function sendUserConfirmEmail(email: string, name: string) {
	const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${import.meta.env.VITE_SENDGRID_API_KEY}`
		},
		body: JSON.stringify({
			personalizations: [
				{
					to: [
						{
							email: email,
							name: name
						}
					],
					subject: 'Thank you for your application!'
				}
			],
			from: {
				email: 'no-reply@canadianchinchilla.ca',
				name: 'Canadian Chinchilla Rescue'
			},
			content: [
				{
					type: 'text/html',
					value: `<p>Thank you for your application ${
						name.split(' ')[0]
					}! We will review your application and contact you shortly.</p>`
				}
			]
		})
	});

	if (res.status === 202) {
		console.log('User email sent');
		return true;
	} else {
		console.log(`Error sending user email: ${res.status} ${res.statusText}`);
		return false;
	}
}

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(applicationSchema))
	};
};
