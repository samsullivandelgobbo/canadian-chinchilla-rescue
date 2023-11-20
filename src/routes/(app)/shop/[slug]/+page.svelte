<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const product = data.product;
</script>

<div class="mx-auto max-w-7xl md:px-24 px-4 py-8">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
		<div class="flex w-full h-full">
			<img class="w-full h-full object-cover" src={product.image} alt={product.name} />
		</div>

		<div class="flex flex-col w-full h-full">
			<div class="flex flex-col gap-4 pt-8">
				<h1 class="text-2xl font-semibold">{product.title}</h1>
				<h2 class="text-xl font-light">${product.price}</h2>
			</div>

			<div class="flex flex-col gap-4 pt-8 justify-start">
				<button class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded w-1/2 ju">
					Add to Cart
				</button>
			</div>

			<div class="flex flex-col gap-4 pt-8 justify-start">
				<h2 class="text-lg font-bold">Description</h2>
				<p class="text-sm font-light">{product.description}</p>
			</div>
		</div>
	</div>
</div>
