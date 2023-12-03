import { writable } from 'svelte/store';

const cartId = writable<string | null>(null);

// persist cartId to localStorage
if (typeof window !== 'undefined') {
	const cartIdString = localStorage.getItem('cartId');
	if (cartIdString) {
		cartId.set(cartIdString);
	}
	cartId.subscribe((cartId) => {
		if (cartId) {
			localStorage.setItem('cartId', cartId);
		}
	});
}

export default cartId;
