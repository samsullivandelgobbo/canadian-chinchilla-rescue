<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { applyAction } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import cartId from '$lib/stores/shoppingCart';
	import { Check, Minus, Plus } from 'lucide-svelte';
	import * as Popover from '$lib/components/ui/popover';
	import * as Select from '$lib/components/ui/select';
	import * as Command from '$lib/components/ui/command';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import RescueChinCard from '$lib/components/RescueChinCard.svelte';

	export let data: PageData;

	const product = data.product;
	const chinchillas = data.chinchillas;
	let loading = false;
	let quantity = 1;

	const addToCart: SubmitFunction = async ({ formElement, formData, action, cancel }) => {
		loading = true;

		return async ({ result }) => {
			await applyAction(result);

			// check if $page.form is valid

			if ($page.form && $page.form.success) {
				loading = false;
				// reset cartId store
				cartId.set(null);
				// set cartId store
				cartId.set($page.form.cartId);
			}
		};
	};
</script>

<div class="mx-auto max-w-7xl md:px-24 px-4 py-8">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
		<div class="flex w-full h-full">
			<img class="w-full h-full object-cover" src={product.image} alt={product.name} />
		</div>

		<div class="flex flex-col w-full h-full">
			<div class="flex flex-col gap-4 pt-8">
				<h1 class="text-2xl font-semibold">{product.title}</h1>
				<h2 class="text-xl font-light">${parseFloat(product.price).toFixed(2)}</h2>
			</div>

			<div class="flex flex-col gap-4 pt-8 justify-start">
				<form method="POST" action={`/shop/${product.slug}`} use:enhance={addToCart}>
					<input type="hidden" name="productId" value={product.variants[0].id} />
					<input type="hidden" name="quantity" value={quantity} />
					<input type="hidden" name="cartId" value={$cartId} />

					<div class="flex flex-col gap-4">
						<Button
							type="submit"
							class="w-full sm:w-1/2"
							on:click={() => {
								console.log('clicked');
							}}
						>
							{loading ? 'Adding to cart' : 'Add to cart'}
							{#if loading}
								<div class="fill-white">
									<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
										><style>
											.spinner_qM83 {
												animation: spinner_8HQG 1.05s infinite;
											}
											.spinner_oXPr {
												animation-delay: 0.1s;
											}
											.spinner_ZTLf {
												animation-delay: 0.2s;
											}
											@keyframes spinner_8HQG {
												0%,
												57.14% {
													animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
													transform: translate(0);
												}
												28.57% {
													animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
													transform: translateY(-6px);
												}
												100% {
													transform: translate(0);
												}
											}
										</style><circle class="spinner_qM83" cx="4" cy="12" r="3" /><circle
											class="spinner_qM83 spinner_oXPr"
											cx="12"
											cy="12"
											r="3"
										/><circle class="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="3" /></svg
									>
								</div>
							{/if}
						</Button>

						<!-- quantity buttons -->
						<div class="flex flex-row gap-4 sm:w-1/2 justify-center">
							<button
								type="button"
								aria-label="Decrease quantity"
								on:click={() => {
									if (quantity > 1) {
										quantity -= 1;
									}
								}}
								class={`bg-gray-50 border border-gray-400 hover:bg-gray-300 text-gray-800 font-bold rounded-full w-10 h-10 active:scale-95 transform transition duration-200 items-center justify-center flex
                ${quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
							>
								-
							</button>

							<div
								class="flex justify-center items-center py-2 px-4 bg-gray-100 border border-gray-400 rounded-full w-10 h-10"
							>
								<span class="text-gray-800 font-bold">{quantity}</span>
							</div>

							<button
								type="button"
								aria-label="Increase quantity"
								on:click={() => {
									quantity += 1;
								}}
								class="bg-gray-50 border border-gray-400 hover:bg-gray-300 text-gray-800 font-bold rounded-full w-10 h-10 active:scale-95 transform transition duration-200 items-center justify-center flex"
							>
								<Plus class="w-4 h-4" />
							</button>
						</div>
					</div>
				</form>
			</div>

			<div class="flex flex-col gap-4 pt-8 justify-start">
				<h2 class="text-lg font-bold">Description</h2>
				<p class="text-sm font-light">{product.description}</p>
			</div>

			<div class="flex flex-col gap-4 mt-4">
				<h3 class="text-lg font-bold">Donate to a chinchilla</h3>
				<p class="" />

				<Select.Root portal={null}>
					<Select.Trigger class="w-[180px]">
						<Select.Value placeholder="Select a chinchilla" />
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>chinchillas</Select.Label>
							{#each chinchillas as chinchilla}
								<Select.Item value={chinchilla.name} label={chinchilla.name}
									>{chinchilla.name}</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name="favoritechinchilla" />
				</Select.Root>

				<!-- <RescueChinCard chinchilla={chinchillas[0]} /> -->

				<Button variant="outline" size="">Donate</Button>
			</div>
		</div>
	</div>
</div>
