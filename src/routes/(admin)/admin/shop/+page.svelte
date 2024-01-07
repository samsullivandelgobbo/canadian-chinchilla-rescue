<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import NewChinchilla from '$lib/img/chin-winter-icon.png';
	import HoneyChinchilla from '$lib/img/chin-honey-icon.png';
	import ShopIcon from '$lib/img/apple-sticks-icon.png';
	import TreatChinchilla from '$lib/img/chin-treat-icon.png';
</script>

<Card.Root>
	<div class="p-4">
		<h2 class="text-base font-semibold leading-6 text-gray-900">Shop</h2>
		<p class="mt-1 text-sm text-gray-500" />
		<ul
			role="list"
			class="mt-6 grid grid-cols-1 gap-6 border-t border-gray-200 py-6 sm:grid-cols-2"
		>
			<li class="flow-root">
				<div
					class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 hover:bg-gray-50 group"
				>
					<div
						class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-sky-100 group-hover:bg-sky-300"
					>
						<img class="h-12 w-12" src={HoneyChinchilla} alt="Blog Icon" />
					</div>
					<div>
						<h3 class="text-sm font-medium text-gray-900">
							<a
								href="https://admin.shopify.com/store/canadian-chinchila-rescue/products"
								target="_blank"
								class="focus:outline-none"
							>
								<span class="absolute inset-0" aria-hidden="true" />
								<span> Manage Shop Products </span>
								<span aria-hidden="true"> &rarr;</span>
							</a>
						</h3>
						<p class="mt-1 text-sm text-gray-500">
							Go to the shopify admin page to manage products.
						</p>
					</div>
				</div>
			</li>
			<li class="flow-root">
				<div
					class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 hover:bg-gray-50 group"
				>
					<div
						class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-pink-100 group-hover:bg-pink-300"
					>
						<img class="h-12 w-12" src={NewChinchilla} alt="Shop Icon" />
					</div>
					<div>
						<h3 class="text-sm font-medium text-gray-900">
							<a href="/admin/rescue" class="focus:outline-none">
								<span class="absolute inset-0" aria-hidden="true" />
								<span> New Chinchilla? </span>
								<span aria-hidden="true"> &rarr;</span>
							</a>
						</h3>
						<p class="mt-1 text-sm text-gray-500">Update the available chinchillas for adoption.</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</Card.Root>
