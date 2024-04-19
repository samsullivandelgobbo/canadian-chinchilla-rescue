import type { PageServerLoad } from './$types';
import { db } from '$lib/data/db';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
	if (!locals.user) {
		return {
			status: 401,
			error: new Error('Unauthorized')
		};
	}
	const userId = locals.user.id;
	try {
	

		const applications = await db.rescueApplication.findMany({
			include: {
				readBy: {
					select: {
						id: true
					}
				}
			}
		});

		applications.forEach((application) => {
			application.status = application.readBy.some((user) => user.id === userId)
				? application.archived
					? 'archived'
					: 'read'
				: application.archived
				? 'archived'
				: 'unread';
		});

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
