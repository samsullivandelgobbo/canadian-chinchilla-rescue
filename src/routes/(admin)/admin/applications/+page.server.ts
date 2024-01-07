import type { PageServerLoad } from './$types';
import { db } from '$lib/data/db';

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
	if (!locals.user) {
		return {
			status: 401,
			error: new Error('Unauthorized')
		};
	}
	const userId = locals.user.id;
	try {
		// const user = await db.user.findUnique({
		//   where: {
		//     id: userId
		//   }
		// });

		const applications = await db.rescueApplication.findMany();
		console.log('applications', applications);
		return {
			applications
		};
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			error: new Error('Error loading applications')
		};
	}
};
