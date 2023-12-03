import type { PageServerLoad, Actions, Action } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { applicationSchema } from './schema';
import { db } from '$lib/data/db';

const submitApplication: Action = async ({ params, request, locals }) => {
	const formData = await request.formData();
	const firstName = formData.get('firstName') as string;
	const lastName = formData.get('lastName') as string;
	const age = formData.get('age') as string;
	const email = formData.get('email') as string;
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, applicationSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// create application in database
		// const application =

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
