<script lang="ts">
	import ChinchillaShop from '$lib/img/shop_hero.png?format=webp';
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	export let data: PageData;

	const products = data.products;
</script>

<svelte:head>
	<!-- Seo -->
	<title>Shop | Canadian Chinchilla Rescue</title>
	<meta
		name="description"
		content="Shop for chinchilla toys, we have chew toys, wood sticks, treats and more, no matter how picky your chinchilla is, we have something for them."
	/>
</svelte:head>
<div class="bg-white">
	<div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
		<div class="flex w-full relative lg:px-12">
			<img
				class="w-full object-cover object-top rounded-t-xl lg:max-h-[400px]"
				src={ChinchillaShop}
				alt=""
			/>

			<div class="hidden absolute w-full inset-0 h-full lg:flex items-center px-24" />
			<div
				class="lg:hidden absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-100/20"
			/>
			<h1
				class="absolute lg:hidden text-3xl font-bold flex justify-center top-0 left-0 w-full h-full items-center text-white"
			>
				Welcome to our shop
			</h1>
			<div
				class="absolute hidden lg:flex flex-col top-0 left-0 lg:px-24 p-2 py-4 lg:py-8 space-y-4"
			>
				<h1 class="text-5xl font-bold text-gray-50">Welcome to our shop</h1>
				<p class="text-lg hidden lg:flex text-gray-200">
					Shop for chew toys, wood sticks, treats and more.
				</p>
			</div>
		</div>

		<div class="mx-auto max-w-2xl px-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-12">
			<div class="grid grid-cols-3 w-full gap-8 mb-10">
				<Card.Root
					class="bg-gradient-to-br p-2 from-orange-400/50 to-pink-500 hover:from-red-200/80 hover:to-orange-500/80  "
				>
					<div class="bg-white/80 rounded-md h-full w-full">
						<Card.Header>
							<!-- <img src="/img/chew_toys_icon.png" alt="" class="w-16 h-16" /> -->
							<Card.Title>Chew Toys</Card.Title>
							<Card.Description>
								Shop for chew toys, we have chew toys, wood sticks, treats and more.
							</Card.Description>
						</Card.Header>
						<Card.Footer>
							<Button variant="outline">Shop Now</Button>
						</Card.Footer>
					</div>
				</Card.Root>
				<Card.Root
					class="bg-gradient-to-br p-2 from-orange-400/50 to-pink-500 hover:from-red-200/80 hover:to-orange-500/80 "
				>
					<div class="bg-white/80 rounded-md h-full w-full">
						<Card.Header>
							<!-- <img src="/img/chew_toys_icon.png" alt="" class="w-16 h-16" /> -->
							<Card.Title>Stick Chews</Card.Title>
							<Card.Description>Shop for apple, pear and more wood chew sticks.</Card.Description>
						</Card.Header>
						<Card.Footer>
							<Button variant="outline">Shop Now</Button>
						</Card.Footer>
					</div>
				</Card.Root>
				<Card.Root
					class="bg-gradient-to-br p-2 from-orange-400/50 to-pink-500 hover:from-red-200/80 hover:to-orange-500/80 "
				>
					<div class="bg-white/80 rounded-md h-full w-full">
						<Card.Header>
							<!-- <img src="/img/chew_toys_icon.png" alt="" class="w-16 h-16" /> -->
							<Card.Title>Chew Toys</Card.Title>
							<Card.Description>
								Shop for chew toys, we have chew toys, wood sticks, treats and more.
							</Card.Description>
						</Card.Header>
						<Card.Footer>
							<Button variant="outline">Shop Now</Button>
						</Card.Footer>
					</div>
				</Card.Root>
			</div>

			<div class="md:flex md:items-center md:justify-between">
				<h2 class="text-2xl font-bold tracking-tight text-gray-900">Trending products</h2>
				<a href="#" class="hidden text-sm font-medium text-red-600 hover:text-red-500 md:block">
					Shop more products
					<span aria-hidden="true"> &rarr;</span>
				</a>
			</div>

			<div
				class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8"
			>
				{#each products as product}
					<div class="group relative">
						<div
							class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80"
						>
							<img
								src={product.image}
								alt={product.title}
								class="h-full w-full object-cover object-center"
							/>
						</div>
						<h3 class="mt-4 text-sm text-gray-700">
							<a href={`/shop/${product.handle}`}>
								<span class="absolute inset-0" />
								{product.title}
							</a>
						</h3>
						<p class="mt-1 text-sm text-gray-500" />
						<p class="mt-1 text-sm font-medium text-gray-900">
							${parseFloat(product.price).toFixed(2)}
						</p>
					</div>

					<!-- More products... -->
				{/each}
			</div>

			<div class="mt-8 text-sm md:hidden">
				<a href="#" class="font-medium text-red-600 hover:text-red-500">
					Shop more products
					<span aria-hidden="true"> &rarr;</span>
				</a>
			</div>
		</div>
	</div>
</div>
