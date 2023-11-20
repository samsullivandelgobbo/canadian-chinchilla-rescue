<script lang="ts">
	export let products: any[] = [];
	import {
		Cloud,
		CreditCard,
		Github,
		Keyboard,
		LifeBuoy,
		LogOut,
		Mail,
		MessageSquare,
		Plus,
		PlusCircle,
		Settings,
		ShoppingBag,
		ShoppingCart,
		ShoppingCartIcon,
		User,
		UserPlus,
		Users
	} from 'lucide-svelte';

	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Toggle } from '$lib/components/ui/toggle';
	import DropdownMenuItem from './ui/dropdown-menu/dropdown-menu-item.svelte';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			class="flex items-center justify-center  w-12 rounded-full transition-colors duration-200
    "
		>
			<ShoppingCart />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>Shopping Cart</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			{#if products.length === 0}
				<DropdownMenu.Item>
					<span class="text-gray-500">No items in cart</span>
				</DropdownMenu.Item>
			{/if}

			{#each products as product}
				<DropdownMenu.Item>
					<User class="mr-2 h-4 w-4" />
					<span>Profile</span>
					<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
