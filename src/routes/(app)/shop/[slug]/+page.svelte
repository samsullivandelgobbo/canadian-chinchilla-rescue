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
	import type { Chinchilla } from '@prisma/client';
	import { slide } from 'svelte/transition';

	export let data: PageData;

	const product = data.product;
	const chinchillas = data.chinchillas as Chinchilla[];
	let loading = false;
	let quantity = 1;
	let successNotification = false;

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
				successNotification = true;

				setTimeout(() => {
					successNotification = false;
				}, 3000);
				// reset quantity
				quantity = 1;
			}
		};
	};
</script>

{#if successNotification}
	<!-- Global notification live region, render this permanently at the end of the document -->
	<div
		aria-live="assertive"
		class="pointer-events-none fixed flex items-end px-4 py-6 sm:items-start sm:p-6 top-12 inset-x-0"
		transition:slide={{ duration: 300, delay: 300, axis: 'y' }}
	>
		<div class="flex w-full flex-col items-center space-y-4 sm:items-end">
			<div
				class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
			>
				<div class="p-4">
					<div class="flex items-start">
						<div class="flex-shrink-0">
							<svg
								class="h-6 w-6 text-green-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div class="ml-3 w-0 flex-1 pt-0.5">
							<p class="text-sm font-medium text-gray-900">Added to cart</p>
							<p class="mt-1 text-sm text-gray-500">Successfully added to your cart</p>
						</div>
						<div class="ml-4 flex flex-shrink-0">
							<button
								type="button"
								class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span class="sr-only">Close</span>
								<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
									<path
										d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

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

					<div class="flex flex-col gap-4 max-w-[400px]">
						<!-- quantity buttons -->
						<div class="flex flex-row gap-4 sm:w-full justify-start">
							<Button
								variant="outline"
								type="button"
								size="lg"
								aria-label="Decrease quantity"
								on:click={() => {
									if (quantity > 1) {
										quantity -= 1;
									}
								}}
							>
								<Minus class="w-5 h-5" />
							</Button>

							<div
								class="flex justify-center items-center py-2 px-4 bg-gray-100 border border-gray-100 shadow-sm rounded-xl w-full max-w-[200px]"
							>
								<span class="text-gray-800 font-bold">{quantity}</span>
							</div>

							<Button
								type="button"
								variant="outline"
								size="lg"
								aria-label="Increase quantity"
								on:click={() => {
									quantity += 1;
								}}
							>
								<Plus class="w-6 h-5" />
							</Button>
						</div>
						<Button
							type="submit"
							size="lg"
							class="w-full max-w-[400px] gap-2 text-lg shadow-sm "
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
					</div>
				</form>
			</div>

			<div class="flex flex-col gap-4 pt-8 justify-start">
				<h2 class="text-lg font-bold">Description</h2>
				<p class=" font-light">{product.description}</p>
			</div>
		</div>

		<div class="flex flex-col gap-4 mt-24">
			<h3 class="text-lg font-bold">Donate to a chinchilla</h3>
			<p class="text-foreground">
				Donate this item to a chinchilla in our rescue, and we'll send you a photo of them with your
				donation!
			</p>

			<Select.Root portal={null}>
				<Select.Trigger class="w-full">
					<Select.Value placeholder="Select a chinchilla" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Chinchillas</Select.Label>
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

			<Button variant="outline" size="lg">Donate</Button>
		</div>
	</div>
</div>
