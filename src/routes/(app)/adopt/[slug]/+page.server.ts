import type { PageServerLoad } from '../$types';
import { db } from '$lib/data/db';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const slug = params as string;

	if (!slug) {
		throw fail(404, { message: 'Not found' });
	}

	const chinchilla = await db.chinchilla.findFirst({
		where: {
			name: slug
		}
	});

	return {
		chinchilla
	};
};
