import type { LayoutServerLoad } from './$types';
const storefrontAccessToken = import.meta.env.VITE_SHOPIFY_PUBLIC_TOKEN;
const shopUrl = import.meta.env.VITE_SHOPIFY_SHOP_URL;

export const load: LayoutServerLoad = async ({ request, locals }) => {};
