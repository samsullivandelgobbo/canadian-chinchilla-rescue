const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_PUBLIC_TOKEN;
const shopUrl = import.meta.env.VITE_SHOPIFY_SHOP_URL;

export async function GET({ request, url }) {
	// grab cartId from cartId search param
	const cartId = url.searchParams.get('cartId');

	try {
		const response = await fetch(`https://${shopUrl}/api/2023-10/graphql.json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Shopify-Storefront-Access-Token': storefrontAccessToken
			},
			body: JSON.stringify({
				query: `
                  query {
                      cart(id: "${cartId}") {
                          id
                          lines(first: 10) {
                              edges {
                                  node {
                                      merchandise {
                                          ... on ProductVariant {
                                              product {
                                                  title
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
                                      }
                                      quantity
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

		// log quantity of items in cart

		const quantity = data.cart.lines.edges.length;
		// clean up the data (flatten, remove unnecessary fields, etc.)
		const cart = data.cart;
		cart.items = cart.lines.edges.map((edge) => edge.node);

		cart.items.forEach((item) => {
			item.product = item.merchandise.product.title;
			item.price = item.merchandise.product.priceRange.minVariantPrice.amount;
			item.total = item.price * item.quantity;
			item.image = item.merchandise.product.images.edges[0].node.originalSrc;

			delete item.merchandise;
		});
		cart.quantity = cart.lines.edges.length;
		delete cart.lines;

		return new Response(JSON.stringify(data), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error('Error fetching cart data:', error);
		throw error;
	}
}
