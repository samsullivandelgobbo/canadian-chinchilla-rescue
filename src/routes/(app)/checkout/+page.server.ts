import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const shopUrl = import.meta.env.VITE_SHOPIFY_SHOP_URL;
	const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_PUBLIC_TOKEN;

	const cartId = url.searchParams.get('cartId');

	console.log('cartId', cartId);

	if (!cartId) {
		throw new Error('No cartId provided');
	}

	// fetch the checkout link
	const response = await fetch(`https://${shopUrl}/api/2023-10/graphql.json`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Shopify-Storefront-Access-Token': storefrontAccessToken
		},
		body: JSON.stringify({
			query: `
        query checkoutURL {
          cart(id: "${cartId}") {
            checkoutUrl
          }
        }
        `
		})
	});

	const { data, errors } = await response.json();

	console.log('data', data);

	if (errors) {
		console.error('GraphQL errors:', errors);
		throw new Error('GraphQL query errors occurred.');
	}

	const checkout = data.cart.checkoutUrl;
	console.log('checkout', checkout);

	redirect(302, checkout);
};
