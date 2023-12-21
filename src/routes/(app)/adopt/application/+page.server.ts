import type { PageServerLoad, Actions, Action } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { applicationSchema } from './schema';

import { db } from '$lib/data/db';

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, applicationSchema);
		console.log('form', form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// create application in database

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
				cageImage: form.data.cageImage,

				hasChildren: form.data.hasChildren,
				hasAllergies: form.data.hasAllergies,
				hasPets: form.data.hasPets,
				petTypes: form.data.petTypes,
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
				whyChinchilla: form.data.message
			}
		});

		// send email using sendgrid api
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
								email: form.data.email,
								name: `${form.data.firstName} ${form.data.lastName}`
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
						value: `<p>Thank you for your application, ${form.data.firstName}! We will review your application and contact you shortly.</p>`
					}
				]
			})
		});

		const json = await res.json();

		console.log(json);

		// send email to rescue
		// const res2 = await fetch('https://api.sendgrid.com/v3/mail/send', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
		// 	},
		// 	body: JSON.stringify({
		// 		personalizations: [
		// 			{
		// 				to: [
		// 					{
		// 						email: 'canadianchinchillarescue@gmail.com',
		// 						name: 'Canadian Chinchilla Rescue'
		// 					}
		// 				],
		// 				subject: 'New adoption application!'
		// 			}
		// 		],
		// 		from: {
		// 			email: 'no-reply@canadianchinchilla.ca',
		// 			name: 'Canadian Chinchilla Rescue Web Application'
		// 		},
		// 		content: [
		// 			{
		// 				type: 'text/html',
		// 				value: `<p>There is a new adoption application from ${form.data.firstName} ${form.data.lastName}! Please log in to the admin panel to view it.</p>`
		// 			}
		// 		]
		// 	})
		// });

		// if (res2.status !== 202) {
		// 	console.error(await res2.json());
		// 	return fail(500, {
		// 		form
		// 	});
		// }

		return {
			form
		};
	}
};

// export const actions: Actions = {
// 	default: submitApplication
// };

export const load: PageServerLoad = () => {
	return {
		form: superValidate(applicationSchema)
	};
};
