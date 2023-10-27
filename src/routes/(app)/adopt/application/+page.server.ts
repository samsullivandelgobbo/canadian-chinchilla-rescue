import type { PageServerLoad, Actions, Action } from './$types';

const submitApplication: Action = async ({ params, request, locals }) => {
	const formData = await request.formData();
	const firstName = formData.get('firstName') as string;
	const lastName = formData.get('lastName') as string;
	const age = formData.get('age') as string;
	const email = formData.get('email') as string;
};

export const actions: Actions = {
	default: submitApplication
};
