<script lang="ts">
	import ChinchillaShop from '$lib/img/shop_hero.png?format=webp';
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
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
		<div class="flex w-full relative px-12">
			<img class="w-full object-cover object-top rounded-xl" src={ChinchillaShop} alt="" />

			<div class="hidden absolute w-full inset-0 h-full lg:flex items-center px-24">
				<div class="grid grid-cols-4 w-full h-1/2 gap-24 max-h-36">
					<div
						class="flex flex-col items-center justify-center rounded-xl shadow-md bg-gradient-to-br from-orange-400/50 to-pink-200 hover:from-red-200/80 hover:to-orange-500/80 transition transform hover:scale-105 duration-500"
					>
						<h3 class="text-2xl font-bold text-gray-900">Chew Toys</h3>
						<p class="text-lg text-gray-700">Shop Now</p>
					</div>
					<div
						class="flex flex-col items-center justify-center rounded-xl shadow-md bg-gradient-to-br from-pink-400/50 to-red-200 hover:from-pink-200/80 hover:to-orange-500/80 transition transform hover:scale-105 duration-500"
					>
						<h3 class="text-2xl font-bold text-gray-900">Wood Sticks</h3>
						<p class="text-lg text-gray-700">Shop Now</p>
					</div>
					<div
						class="flex flex-col items-center justify-center rounded-xl shadow-md bg-gradient-to-br from-orange-400/50 to-orange-200 hover:from-red-200/80 hover:to-pink-500/80 transition transform hover:scale-105 duration-500"
					>
						<h3 class="text-2xl font-bold text-gray-900">Treats</h3>
						<p class="text-lg text-gray-700">Shop Now</p>
					</div>
					<div
						class="flex flex-col items-center justify-center rounded-xl shadow-md bg-gradient-to-br from-orange-400/50 to-pink-200 hover:from-orange-300/80 hover:to-orange-500/80 transition transform hover:scale-105 duration-500"
					>
						<h3 class="text-2xl font-bold text-gray-900">Accessories</h3>
						<p class="text-lg text-gray-700">Shop Now</p>
					</div>
				</div>
			</div>
			<div
				class="lg:hidden absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-200/50"
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
		<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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
				<div class="group relative">
					<div
						class="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80"
					>
						<img
							src="/img/apple_sticks.png"
							alt="Apple Sticks"
							class="h-full w-full object-cover object-center"
						/>
					</div>
					<h3 class="mt-4 text-sm text-gray-700">
						<a href="#">
							<span class="absolute inset-0" />
							Apple Sticks
						</a>
					</h3>
					<p class="mt-1 text-sm text-gray-500">1lb</p>
					<p class="mt-1 text-sm font-medium text-gray-900">$25</p>
				</div>

				<!-- More products... -->
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
