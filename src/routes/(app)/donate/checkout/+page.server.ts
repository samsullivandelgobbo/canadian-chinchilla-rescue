import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Action, Actions } from './$types';
import Stripe from 'stripe';
const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
	apiVersion: '2023-08-16'
});

const domain = import.meta.env.VITE_DOMAIN;

export const load: PageServerLoad = async ({ url, cookies, locals }) => {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price: 'price_1NzX6ZElGJhTdCDD28J3LqP7',
				quantity: 1
			}
		],
		mode: 'payment',
		success_url: `${domain}/donate/success`,
		cancel_url: `${domain}/donate`
	});
	if (session && session.url) {
		throw redirect(302, session.url);
	}
};
