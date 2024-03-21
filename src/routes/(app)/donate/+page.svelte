<script lang="ts">
	import Dialog from '$lib/components/Dialog.svelte';
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import type { PageData } from './$types';

	const dispatch = createEventDispatcher();

	let dialog;

	let showMoreInfoModal = false;
	let showModal = false;
	let paymentModalOpen;
</script>

<svelte:head>
	<!-- Seo -->
	<title>Donate | Canadian Chinchilla Rescue</title>
	<meta
		name="description"
		content="We have a lot of chinchillas to take care of, and we need your help to do it. We are a non-profit organization, and we rely on donations to keep our chinchillas happy and healthy. We appreciate any amount you can give."
	/>
</svelte:head>

<div class="bg-white py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div
			class="mx-auto grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:mx-0 lg:max-w-none lg:grid-cols-2"
		>
			<div class="lg:pr-4">
				<div
					class="relative overflow-hidden rounded-3xl bg-gray-900 px-6 pb-9 pt-64 shadow-2xl sm:px-12 lg:max-w-lg lg:px-8 lg:pb-8 xl:px-10 xl:pb-10"
				>
					<img
						class="absolute inset-0 h-full w-full object-cover brightness-9 saturate-"
						src="/img/donation_chinchilla.png"
						alt=""
					/>

					<div
						class="absolute left-1/2 top-1/2 -ml-16 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl"
						aria-hidden="true"
					>
						<div
							class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#fbfbfb] opacity-40"
							style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
						/>
					</div>
				</div>
				<dl class="mt-10 grid grid-cols-2 gap-8 border-t border-gray-900/10 pt-10 sm:grid-cols-2">
					<div>
						<dt class="text-sm font-semibold leading-6 text-gray-600">Founded</dt>
						<dd class="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">2008</dd>
					</div>
					<div>
						<dt class="text-sm font-semibold leading-6 text-gray-600">Chinchillas</dt>
						<dd class="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">21</dd>
					</div>
					<!-- <div>
						<dt class="text-sm font-semibold leading-6 text-gray-600">Countries</dt>
						<dd class="mt-2 text-3xl font-bold leading-10 tracking-tight text-gray-900">2</dd>
					</div> -->
				</dl>
			</div>
			<div>
				<div class="text-base leading-7 text-gray-700 lg:max-w-lg">
					<p class="text-base font-semibold leading-7 text-red-400/80">Donate</p>
					<h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						We appreciate your support
					</h1>
					<div class="max-w-xl">
						<p class="mt-6">
							We have a lot of chinchillas to take care of, and we need your help to do it. We are a
							non-profit organization, and we rely on donations to keep our chinchillas happy and
							healthy. We appreciate any amount you can give. We are currently accepting donations
							through our Canada Helps page. Please click the button below to start the donation
							process.
						</p>
						<p class="mt-8">
							There are many ways you can donate. You can donate money, food, toys, or even your
							time. You can select to donate items from our <a
								href="/shop"
								class="underline text-red-400">shop</a
							>, or you can donate money to us directly. We also accept donations of food and toys
							for our chinchillas. If you would like to donate your time, please contact us and we
							will let you know how you can help.
						</p>
						<p class="mt-8">
							<a
								target="_blank"
								href="https://www.canadahelps.org/gp/18298/"
								class="text-base font-semibold leading-6 text-red-400/80 hover:text-red-400"
							>
								Donate &rarr;
							</a>
							<!-- <a
								href="/donate/checkout"
								class="text-base font-semibold leading-6 text-red-400/80 hover:text-red-400"
							>
								Get started &rarr;
							</a> -->
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="relative bg-neutral-800 mt-24 rounded-3xl">
			<div
				class="relative h-80 overflow-hidden bg-gradient-to-tr from-red-300 to-pink-300 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2 rounded-t-3xl"
			>
				<img class="h-full w-full object-cover rounded-3xl p-4" src="/img/sponsor_me.png" alt="" />
				<svg
					viewBox="0 0 926 676"
					aria-hidden="true"
					class="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]"
				>
					<path
						fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
						fill-opacity=".4"
						d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
					/>
					<defs>
						<linearGradient
							id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
							x1="926.392"
							x2="-109.635"
							y1=".176"
							y2="321.024"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#776FFF" />
							<stop offset="1" stop-color="#FF4694" />
						</linearGradient>
					</defs>
				</svg>
			</div>

			<div class="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
				<div class="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
					<h2 class="text-base font-semibold leading-7 text-red-400">Become a sponsor</h2>
					<p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
						Sponsor any of our chinchillas
					</p>
					<p class="mt-6 text-base leading-7 text-gray-300">
						Want to help out but don't have the time to volunteer? You can sponsor any of our
						chinchillas. This will help us pay for their food, toys, and other expenses. You can
						sponsor a chinchilla for as little as $5 a month. You can also sponsor multiple
						chinchillas if you want to help out more.
					</p>
					<div class="mt-8">
						<!-- Sponsor amount select buttons -->
						<div class="grid grid-cols-2 sm:grid-cols-1 gap-4">
							<button
								class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-400 hover:bg-red-500 md:py-4 md:text-lg md:px-10"
							>
								$5
							</button>
							<button
								class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-400 hover:bg-red-500 md:py-4 md:text-lg md:px-10"
							>
								$10
							</button>
							<button
								class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-400 hover:bg-red-500 md:py-4 md:text-lg md:px-10"
							>
								$25
							</button>
							<button
								class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-400 hover:bg-red-500 md:py-4 md:text-lg md:px-10"
							>
								$50
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
