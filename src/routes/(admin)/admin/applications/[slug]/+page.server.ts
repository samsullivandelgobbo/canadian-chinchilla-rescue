import type { PageServerLoad } from '../$types';
import { db } from '$lib/data/db';
import { fail, type Actions, type Action } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	try {
		const { slug } = params;
		console.log('slug', slug);

		const application = await db.rescueApplication.findUnique({
			where: {
				id: parseInt(slug)
			}
		});

		console.log('application', application);

		if (locals.user) {
			const updatedApplication = await db.rescueApplication.update({
				where: {
					id: parseInt(slug)
				},
				data: {
					readBy: {
						connect: {
							id: locals.user.id
						}
					}
				}
			});
		}

		return {
			application
		};
	} catch (error) {
		console.error(error);
		throw fail(500, { error: 'Error loading application' });
	}
};

const markUnread: Action = async ({ params, cookies, locals }) => {
	if (!locals.user) {
		return {
			status: 401,
			error: new Error('Unauthorized')
		};
	}
	const userId = locals.user.id;
	const id = params.slug as string;

	try {
		const application = await db.rescueApplication.findUnique({
			where: {
				id: parseInt(id)
			}
		});

		if (!application) {
			return {
				status: 404,
				error: new Error('Application not found')
			};
		}

		const updatedApplication = await db.rescueApplication.update({
			where: {
				id: parseInt(id)
			},
			data: {
				readBy: {
					disconnect: {
						id: userId
					}
				}
			}
		});

		return {
			application: updatedApplication
		};
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			error: new Error('Error marking application as unread')
		};
	}
};

const unarchiveApplication: Action = async ({ params, cookies, locals }) => {
	if (!locals.user) {
		return {
			status: 401,
			error: new Error('Unauthorized')
		};
	}
	const userId = locals.user.id;
	const id = params.slug as string;

	try {
		const application = await db.rescueApplication.findUnique({
			where: {
				id: parseInt(id)
			}
		});

		if (!application) {
			return {
				status: 404,
				error: new Error('Application not found')
			};
		}

		const updatedApplication = await db.rescueApplication.update({
			where: {
				id: parseInt(id)
			},
			data: {
				archived: false
			}
		});

		return {
			application: updatedApplication
		};
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			error: new Error('Error unarchiving application')
		};
	}
};

const archiveApplication: Action = async ({ params, cookies, locals }) => {
	if (!locals.user) {
		return {
			status: 401,
			error: new Error('Unauthorized')
		};
	}
	const userId = locals.user.id;
	const id = params.slug as string;

	console.log('id', id);

	try {
		const application = await db.rescueApplication.findUnique({
			where: {
				id: parseInt(id)
			}
		});

		if (!application) {
			return {
				status: 404,
				error: new Error('Application not found')
			};
		}

		const updatedApplication = await db.rescueApplication.update({
			where: {
				id: parseInt(id)
			},
			data: {
				archived: true
			}
		});

		return {
			application: updatedApplication
		};
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			error: new Error('Error archiving application')
		};
	}
};

export const actions: Actions = {
	archive: archiveApplication,
	'mark-unread': markUnread,
	unarchive: unarchiveApplication
};
