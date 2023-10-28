<script>
	import { onMount } from 'svelte';
	import NewChinchilla from '$lib/img/chin-winter-icon.png';
	import HoneyChinchilla from '$lib/img/chin-honey-icon.png';
	import ShopIcon from '$lib/img/apple-sticks-icon.png';
	import TreatChinchilla from '$lib/img/chin-treat-icon.png';
</script>

<div class="bg-white">
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		<div>
			<h2 class="text-base font-semibold leading-6 text-gray-900">Dashboard</h2>
			<p class="mt-1 text-sm text-gray-500" />
			<ul
				role="list"
				class="mt-6 grid grid-cols-1 gap-6 border-b border-t border-gray-200 py-6 sm:grid-cols-2"
			>
				<li class="flow-root">
					<div
						class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-red-400 hover:bg-gray-50 group"
					>
						<div
							class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50 group-hover:bg-teal-100"
						>
							<img class="h-12 w-12" src={HoneyChinchilla} alt="Blog Icon" />
						</div>
						<div>
							<h3 class="text-sm font-medium text-gray-900">
								<a href="/admin/blog" class="focus:outline-none">
									<span class="absolute inset-0" aria-hidden="true" />
									<span>Create a Blog Post </span>
									<span aria-hidden="true"> &rarr;</span>
								</a>
							</h3>
							<p class="mt-1 text-sm text-gray-500">Start publishing posts to your blog.</p>
						</div>
					</div>
				</li>
				<li class="flow-root">
					<div
						class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-red-400 hover:bg-gray-50 group"
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
							<p class="mt-1 text-sm text-gray-500">
								Update the available chinchillas for adoption.
							</p>
						</div>
					</div>
				</li>
				<li class="flow-root">
					<div
						class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-red-400 hover:bg-gray-50 group"
					>
						<div
							class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-sky-100 group-hover:bg-sky-300"
						>
							<img class="h-12 w-12" src={TreatChinchilla} alt="Treat Icon" />
						</div>
						<div>
							<h3 class="text-sm font-medium text-gray-900">
								<a href="/admin/applications" class="focus:outline-none">
									<span class="absolute inset-0" aria-hidden="true" />
									<span> View Chinchilla Applications </span>
									<span aria-hidden="true"> &rarr;</span>
								</a>
							</h3>
							<p class="mt-1 text-sm text-gray-500">Review applications for chinchilla adoption.</p>
						</div>
					</div>
				</li>
				<li class="flow-root">
					<div
						class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-red-400 hover:bg-gray-50 group"
					>
						<div
							class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-violet-100 group-hover:bg-violet-300"
						>
							<img class="h-12 w-12" src={ShopIcon} alt="Shop Icon" />
						</div>
						<div>
							<h3 class="text-sm font-medium text-gray-900">
								<a href="/admin/shop" class="focus:outline-none">
									<span class="absolute inset-0" aria-hidden="true" />
									<span> Manage Shop </span>
									<span aria-hidden="true"> &rarr;</span>
								</a>
							</h3>
							<p class="mt-1 text-sm text-gray-500">
								Add, edit, delete, and update products in the shop.
							</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</div>
