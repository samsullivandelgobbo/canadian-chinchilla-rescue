import type { PageServerLoad, Actions, Action } from './$types';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/data/db';

// export const actions: Actions = {
// 	default: submitApplication
// };

export const load: PageServerLoad = async () => {
	try {
		const chinchillas = await db.chinchilla.findMany();
		return { chinchillas };
	} catch (error) {
		console.log(error);
	}
};
