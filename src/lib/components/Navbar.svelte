<script lang="ts">
	import { page } from '$app/stores';
	let menuOpen = false;
	// check if user switched pages and close menu
	const unsubscribe = page.subscribe(() => {
		menuOpen = false;
	});
</script>

<header class="bg-white">
	<nav
		class="flex items-center justify-between lg:justify-center px-4 py-3 lg:px-8"
		aria-label="Global"
	>
		<div class="flex lg:flex">
			<a href="/" class="p-1.5 mr-12">
				<span class="sr-only">Canadian Chinchilla Rescue</span>
				<img class="h-8 w-auto" src="/logo.png" alt="Logo" />
			</a>
		</div>
		<div class="flex lg:hidden">
			<button
				on:click={() => (menuOpen = !menuOpen)}
				type="button"
				class=" inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</div>
		<div class="hidden lg:flex lg:gap-x-16">
			<a href="/blog" class="text-sm font-semibold leading-6 text-gray-900">Blog</a>
			<a href="/shop" class="text-sm font-semibold leading-6 text-gray-900">Shop</a>
			<a href="/adopt" class="text-sm font-semibold leading-6 text-gray-900">Adopt</a>
			<a href="/about" class="text-sm font-semibold leading-6 text-gray-900">About</a>

			<div class="hidden lg:flex lg:flex-1 lg:justify-end">
				<a href="/donate" class="text-sm font-semibold leading-6 text-red-400 hover:text-red-400/70"
					>Donate <span aria-hidden="true">&rarr;</span></a
				>
			</div>
		</div>
	</nav>
	<!-- Mobile menu, show/hide based on menu open state. -->
	{#if menuOpen}
		<div class="lg:hidden" role="dialog" aria-modal="true">
			<!-- Background backdrop, show/hide based on slide-over state. -->
			<div class="fixed inset-0 z-10" />
			<div
				class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
			>
				<div class="flex items-center justify-between">
					<a href="/" class="-m-1.5 p-1.5">
						<span class="sr-only">Canadian Chinchilla Rescue</span>
						<img class="h-12 w-auto" src="/logo.png" alt="" />
					</a>
					<button
						type="button"
						class="-m-2.5 rounded-md p-3 mb-1 text-gray-700"
						on:click={() => (menuOpen = false)}
					>
						<span class="sr-only">Close menu</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div class="mt-6 flow-root">
					<div class="-my-6 divide-y divide-gray-500/10">
						<div class="space-y-2 py-6">
							<a
								href="/blog"
								class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>Blog
							</a>
							<a
								href="/shop"
								class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>Shop
							</a>
							<a
								href="/adopt"
								class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>Adopt
							</a>
							<a
								href="/about"
								class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>About
							</a>
						</div>
						<div class="py-6">
							<a
								href="/donate"
								class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>Donate
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</header>
