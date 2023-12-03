// import type { LayoutServerLoad } from './$types';
// const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_PUBLIC_TOKEN;
// const shopUrl = import.meta.env.VITE_SHOPIFY_SHOP_URL;

// export const load: LayoutServerLoad = async ({ request, locals }) => {
// 	// load the cart data if it exists
// 	if (locals.cartId) {
// 		const response = await fetch(`https://${shopUrl}/api/2023-10/graphql.json`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'X-Shopify-Storefront-Access-Token': storefrontAccessToken
// 			},
// 			body: JSON.stringify({
// 				query: `
//           query {
//               cart(id: "${locals.cartId}") {
//                   id
//                   lines(first: 10) {
//                       edges {
//                           node {
//                               merchandise {
//                                   ... on ProductVariant {
//                                       product {
//                                           title
//                                           priceRange {
//                                               minVariantPrice {
//                                                   amount
//                                               }
//                                           }

//                                           images(first: 1) {
//                                               edges {
//                                                   node {
//                                                       originalSrc
//                                                   }
//                                               }
//                                           }
//                                       }
//                                   }
//                               }
//                               quantity
//                           }
//                       }
//                   }
//               }
//           }
//       `
// 			})
// 		});

// 		if (!response.ok) {
// 			throw new Error(`HTTP error! status: ${response.status}`);
// 		}

// 		const { data, errors } = await response.json();

// 		if (errors) {
// 			console.error('GraphQL errors:', errors);
// 			throw new Error('GraphQL query errors occurred.');
// 		}

// 		return {
// 			cart: data.cart
// 		};
// 	}

// 	return {};
// };
