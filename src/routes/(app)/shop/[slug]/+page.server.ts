import type { PageServerLoad } from './$types';
import type { Action, Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ request, params }) => {
	const shopUrl = import.meta.env.VITE_SHOPIFY_SHOP_URL;
	const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_PUBLIC_TOKEN;

	const slug = params.slug;

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
              totalInventory
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
              variants(first: 10) {
                  edges {
                      node {
                          id
                          title
                          priceV2 {
                              amount
                          }
                          availableForSale
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
		product.variants = product.variants.edges.map((edge) => edge.node);
		delete product.variants.edges;

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

		const form = await request.formData();
		const quantity = form.get('quantity');
		const productId = form.get('productId') as string;

		const cartId = form.get('cartId') as string;

		if (cartId) {
			// cart exists, add to cart

			console.log('cart exists, add to cart');

			console.log('cartId:', cartId);

			const response = await fetch(`https://${shopUrl}/api/2023-10/graphql.json`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Shopify-Storefront-Access-Token': storefrontAccessToken
				},
				body: JSON.stringify({
					query: `
          mutation {
            cartLinesAdd(
              cartId: "${cartId}"
              lines: [
                {
                  quantity: ${quantity}
                  merchandiseId: "${productId}"
                }
              ]
            ) {
              cart {
                id
                createdAt
                updatedAt
                lines(first: 10) {
                  edges {
                    node {
                      id
                      quantity
                    }
                  }
                }
              }
            }
          }
        `
				})
			});

			const { data, errors } = await response.json();

			if (errors) {
				console.error('GraphQL errors:', errors);
				throw new Error('GraphQL query errors occurred.');
			}

			const cart = data.cartLinesAdd.cart;

			console.log('cart quantity:', cart.lines.edges[0].node.quantity);

			return {
				success: true,
				cartId: cart.id,
				cart
			};
		}

		console.log('quantity:', quantity);
		console.log('productId:', productId);

		const response = await fetch(`https://${shopUrl}/api/2023-10/graphql.json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token': storefrontAccessToken
			},
			body: JSON.stringify({
				query: `
        mutation {
          cartCreate(
            input: {
              lines: [
                {
                  quantity: ${quantity}
                  merchandiseId: "${productId}"
                }
              ],
            }
          ) {
            cart {
              id
              createdAt
              updatedAt
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity

                    }
                  }
                }
              }
            }
          }
        `
			})
		});

		const { data, errors } = await response.json();

		if (errors) {
			console.error('GraphQL errors:', errors);
			console.log(errors);
			throw new Error('GraphQL query errors occurred.');
		}

		const cart = data.cartCreate.cart;

		console.log('cart quantity:', cart.lines.edges[0].node.quantity);
		console.log('cart:', cart);

		return {
			success: true,
			cartId: cart.id,
			cart
		};
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

export const actions: Actions = {
	default: addToCart
};
