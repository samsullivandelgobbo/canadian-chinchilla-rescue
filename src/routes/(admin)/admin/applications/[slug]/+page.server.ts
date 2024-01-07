import type { PageServerLoad } from '../$types';
import { db } from '$lib/data/db';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const { slug } = params;
		console.log('slug', slug);
		const application = await db.rescueApplication.findUnique({
			where: {
				id: parseInt(slug)
			}
		});

		console.log('application', application);

		return {
			application
		};
	} catch (error) {
		console.error(error);
		throw fail(500, { error: 'Error loading application' });
	}
};
