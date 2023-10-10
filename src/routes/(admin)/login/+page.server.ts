import type { Actions, Action } from './$types';
import User from '@prisma/client';
import { db } from '$lib/data/db';
import bcrypt from 'bcrypt';
import { fail } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

const login: Action = async ({ params, request, locals, cookies }) => {
	// authenticate the user
	const data = await request.formData();
	const email = data.get('email') as string;
	const password = data.get('password') as string;

	// validate the email and password
	try {
		if (!email || !password) {
			return fail(400, { invalidCredentials: true });
		}

		const user = await db.user.findUnique({
			where: {
				email: email
			}
		});
		if (!user) {
			return fail(400, { invalidCredentials: true });
		}
		if (!user.password) {
			return fail(400, { invalidCredentials: true });
		}
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			return fail(400, { invalidCredentials: true });
		}

		if (valid && user) {
			// set cookies and locals
			locals.user = user;

			// create jwt
		}
	} catch (error) {
		console.log(error);
	}
};

export const actions: Actions = {
	default: login
};
