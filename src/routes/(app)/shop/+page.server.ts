import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const shopUrl = import.meta.env.VITE_SHOPIFY_SHOP_URL;
	const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_PUBLIC_TOKEN;

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
            products(first: 10) {
              edges {
                node {
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

		const products = data.products.edges.map((edge) => edge.node);

		products.forEach((product) => {
			if (product.images.edges) {
				product.image = product.images.edges[0].node.originalSrc;
			}
			delete product.images;
			product.price = product.priceRange.minVariantPrice.amount;
			delete product.priceRange;
		});
		console.log('Products:', products);

		return {
			products
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		// Optionally, you can return an error state or message here
		return { error: 'Failed to fetch products' };
	}
};
