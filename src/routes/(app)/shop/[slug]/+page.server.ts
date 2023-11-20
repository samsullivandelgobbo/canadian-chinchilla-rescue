import type { PageServerLoad } from './$types';
import type { Action, Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ request, params }) => {
	const shopUrl = import.meta.env.VITE_SHOPIFY_SHOP_URL;
	const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_PUBLIC_TOKEN;

	const slug = params.slug;

	console.log('slug:', slug);

	try {
		const response = await fetch(`https://${shopUrl}/api/2023-10/graphql.json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token': storefrontAccessToken
			},
			body: JSON.stringify({
				// grab the product by handle

				query: `
          query {
            productByHandle(handle: "${slug}") {
              id
              title
              handle
              description
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first: 1) {
                edges {
                  node {
                    originalSrc
                  }
                }
              }
            }
          }

        `
			})
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const { data, errors } = await response.json();

		if (errors) {
			console.error('GraphQL errors:', errors);
			throw new Error('GraphQL query errors occurred.');
		}

		const product = data.productByHandle;

		if (product.images.edges) {
			product.image = product.images.edges[0].node.originalSrc;
		}
		delete product.images;
		product.price = product.priceRange.minVariantPrice.amount;
		delete product.priceRange;

		console.log('product:', product);

		return {
			product
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		// Optionally, you can return an error state or message here
		return { error: 'Failed to fetch products' };
	}
};

const addToCart: Action = async ({ request, locals, params }) => {
	try {
		const shopUrl = import.meta.env.VITE_SHOPIFY_SHOP_URL;
		const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_PUBLIC_TOKEN;

		const slug = params.slug;
	} catch (error) {}
};

export const actions: Actions = {
	addToCart
};
