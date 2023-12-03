<script lang="ts">
	import {
		Cloud,
		CreditCard,
		Github,
		Keyboard,
		LifeBuoy,
		LogOut,
		Mail,
		MessageSquare,
		Minus,
		Plus,
		PlusCircle,
		Rotate3D,
		RotateCcw,
		Settings,
		ShoppingBag,
		ShoppingCart,
		ShoppingCartIcon,
		SplitIcon,
		User,
		UserPlus,
		Users
	} from 'lucide-svelte';

	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Toggle } from '$lib/components/ui/toggle';
	import DropdownMenuItem from './ui/dropdown-menu/dropdown-menu-item.svelte';
	import { onMount } from 'svelte';
	import cartId from '$lib/stores/shoppingCart';

	let cartItems: any[] = [];

	async function fetchCartData(cartId: string) {
		// const cartId = localStorage.getItem('cartId');
		if (!cartId) {
			return;
		}

		const response = await fetch(`/cart?cartId=${cartId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();

		cartItems = data.cart.items;
	}

	// subscribe to cartId store
	cartId.subscribe((value) => {
		if (!value) {
			return;
		}
		console.log('value', value);
		fetchCartData(value);
	});

	onMount(async () => {
		if (!$cartId) {
			return;
		}

		const response = await fetch(`/cart?cartId=${$cartId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		cartItems = data.cart.items;
	});
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			class="flex items-center justify-center  w-12 rounded-full transition-colors duration-200 relative
    "
		>
			<ShoppingCart />

			<!-- show num of items in card in tiny badge on top of cart icon -->
			{#if cartItems.length > 0}
				<span
					class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
				>
					{cartItems.length}
				</span>
			{/if}
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="md:w-72 w-[95%]">
		<DropdownMenu.Label>
			<div class="flex flex-row justify-between">
				Shopping Cart

				<!-- reset cart -->
				<button
					class="text-xs flex flex-row gap-1"
					on:click={() => {
						localStorage.removeItem('cartId');
						cartItems = [];
						cartId.set(null);
					}}
				>
					<RotateCcw class="w-4 h-4" />
					Reset
				</button>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			{#if cartItems.length === 0}
				<DropdownMenu.Item>
					<span class="text-gray-500">No items in cart</span>
				</DropdownMenu.Item>
			{/if}

			{#each cartItems as item}
				<DropdownMenu.Item
					on:click={() => {
						window.location.href = `/shop/${item.product.slug}`;
					}}
				>
					<!-- remove item  -->

					<img class="w-8 h-8 rounded-full" src={item.image} alt={item.name} />
					<span class="ml-2">{item.product}</span>
					<span class="ml-2">x{item.quantity}</span>

					<span class="ml-auto">${item.total}</span>
				</DropdownMenu.Item>
			{/each}

			<DropdownMenu.Label>
				<span class="ml-auto">Total: ${cartItems.reduce((acc, item) => acc + item.total, 0)}</span>
			</DropdownMenu.Label>

			<DropdownMenu.Item>
				<Button
					on:click={() => {
						window.location.href = '/checkout?cartId=' + $cartId;
					}}
					variant="default"
					class="w-full "
					disabled={cartItems.length === 0}>Checkout</Button
				>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
