<script lang="ts">
	import { Bell } from 'lucide-svelte';
	import NotificationPopover from './NotificationPopover.svelte';
	import { fade } from 'svelte/transition';

	let mobileMenuOpen = false;
</script>

<header class="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
	<div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<div class="flex flex-1 items-center gap-x-6">
			<button
				type="button"
				class="-m-3 p-3 md:hidden"
				on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-5 w-5 text-gray-900"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fill-rule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
			<img class="h-10 w-auto" src="/logo.png" alt="Your Company" />
		</div>
		<nav
			class="hidden md:flex md:gap-x-11 md:text-sm md:font-semibold md:leading-6 md:text-gray-700"
		>
			<a href="/admin">Home</a>
			<a href="/admin/rescue">Rescue</a>
			<a href="/admin/blog">Blog</a>
			<a href="/admin/shop">Shop</a>
			<a href="/admin/applications">Applications</a>
		</nav>
		<div class="flex flex-1 items-center justify-end gap-x-8">
			<button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
				<span class="sr-only">View notifications</span>
				<NotificationPopover />
			</button>
		</div>
	</div>
	<!-- Mobile menu, show/hide based on menu open state. -->
	{#if mobileMenuOpen}
		<div class="lg:hidden" role="dialog" aria-modal="true" transition:fade={{ duration: 300 }}>
			<!-- Background backdrop, show/hide based on slide-over state. -->
			<div class="fixed inset-0 z-50" />
			<div
				class="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10"
			>
				<div class="-ml-0.5 flex h-16 items-center gap-x-6">
					<button
						type="button"
						class="-m-2.5 p-2.5 text-gray-700"
						on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
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
					<div class="-ml-0.5">
						<a href="#" class="-m-1.5 block p-1.5">
							<span class="sr-only">Your Company</span>
							<img class="h-10 w-auto" src="/logo.png" alt="" />
						</a>
					</div>
				</div>
				<div class="mt-2 space-y-2">
					<a
						href="/admin"
						class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
						>Home</a
					>
					<a
						href="/admin/rescue"
						class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
						>Rescue</a
					>
					<a
						href="/admin/blog"
						class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
						>Blog</a
					>
					<a
						href="/admin/shop"
						class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
						>Shop</a
					>
					<a
						href="/admin/applications"
						class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
						>Applications</a
					>
				</div>
			</div>
		</div>
	{/if}
</header>
