import { db } from '$lib/data/db';

export async function GET({}) {}

export async function POST({ request, locals, params }) {
	const body = await request.json();

	console.log(params);

	const id = params.slug;

	console.log('id', id);

	if (!id) {
		return new Response('ID is required', {
			status: 400,
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	if (!locals.user) {
		return new Response('Not authorized', {
			status: 401,
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	const authorId = locals.user.id;

	if (!authorId) {
		return new Response('Not authorized', {
			status: 401,
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	// validate fields
	if (!body.title) {
		return new Response('Title is required', {
			status: 400,
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	const draft = await db.draft.upsert({
		where: {
			id: id
		},
		create: {
			id: id,
			title: body.title,
			description: body.description,
			content: body.content,
			authorId: authorId
		},
		update: {
			title: body.title,
			description: body.description,
			content: body.content,
			authorId: authorId
		}
	});

	console.log('draft', draft);

	if (!draft) {
		return new Response('Error saving draft', {
			status: 500,
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	return new Response(JSON.stringify(draft), {
		headers: {
			'content-type': 'application/json'
		}
	});
}

export async function DELETE({ request, params, locals }) {
	if (!locals.user) {
		return new Response('Not authorized', {
			status: 401,
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	const id = params.slug;

	if (!id) {
		return new Response('ID is required', {
			status: 400,
			headers: {
				'content-type': 'application/json'
			}
		});
	}

	try {
		const draft = await db.draft.delete({
			where: {
				id: id
			}
		});

		return new Response(JSON.stringify(draft), {
			status: 200,
			headers: {
				'content-type': 'application/json'
			}
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify(error), {
			status: 500,
			headers: {
				'content-type': 'application/json'
			}
		});
	}
}
