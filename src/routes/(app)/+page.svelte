<script>
	import TiltCard from '$lib/components/TiltCard.svelte';
	import Hero from '$lib/img/hero.png?format=webp&h=720';
	import ShopCause from '$lib/img/shop_cause.png?format=webp&w=500&h=300';
	import ChinchillaBlog from '$lib/img/chinchilla_blog.png?format=webp&w=500&h=300';
	import ContactChinchilla from '$lib/img/contact_chinchilla.png?format=webp&w=500&h=300';
	import ChinchillaTuxedo from '$lib/img/chinchilla_tuxedo.png?format=webp';
</script>

<svelte:head>
	<title>Canadian Chinchilla Rescue</title>
	<meta
		name="description"
		content="Canadian Chinchilla Rescue is a non-profit organization that rescues chinchillas and educates owners on chinchilla care. Dedicated to the rescue, rehabilitation, and responsible placement of chinchillas in need."
	/>
</svelte:head>

<div class=" w-full">
	<img class="w-full object-center object-cover h-72 lg:h-full" src={Hero} alt="" />
</div>

<div class="flex justify-center py-24">
	<div class="grid lg:grid-cols-3 grid-rows gap-8">
		<TiltCard>
			<a href="/shop">
				<img class="rounded-t-lg" src={ShopCause} alt="" />
			</a>
			<div class="p-5 bg-gray-50 rounded-xl">
				<a href="/shop">
					<h5 class="text-xl font-semibold text-gray-700 pb-4">New Shop</h5>
				</a>
				<a href="/shop">
					<p class="text-sm text-gray-700 pb-4">
						Shop chinchilla supplies, toys, treats & more in our new shop
					</p>
				</a>

				<a
					href="/shop"
					class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-100 border-gray-500 border-2 rounded-lg hover:bg-gray-200 focus:ring-0"
				>
					Shop now
				</a>
			</div>
		</TiltCard>
		<TiltCard>
			<a href="/blog">
				<img class="rounded-t-lg" src={ChinchillaBlog} alt="" />
			</a>
			<div class="p-5 bg-gray-50 rounded-xl">
				<a href="/blog">
					<h5 class="text-xl font-semibold text-gray-700 pb-4">Chinchilla Blog</h5>
				</a>

				<a href="/blog">
					<p class="text-sm text-gray-700 pb-4">
						Learn everything about chinchillas, their care, and more in our blog
					</p>
				</a>

				<a
					href="/blog"
					class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-100 border-gray-500 border-2 rounded-lg hover:bg-gray-200 focus:ring-0"
				>
					Read now
				</a>
			</div>
		</TiltCard>
		<TiltCard>
			<a href="/about">
				<img class="rounded-t-lg" src={ContactChinchilla} alt="" />
			</a>
			<div class="p-5 bg-gray-50 rounded-xl">
				<a href="/about">
					<h5 class="text-xl font-semibold text-gray-700 pb-4">Our Rescue</h5>
				</a>
				<a href="/about">
					<p class="text-sm text-gray-700 pb-4">
						Learn about our rescue, our mission, and how you can help
					</p>
				</a>

				<a
					href="/about"
					class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-gray-100 border-gray-500 border-2 rounded-lg hover:bg-gray-200 focus:ring-0"
				>
					Learn More
				</a>
			</div>
		</TiltCard>
	</div>
</div>

<div class="bg-white">
	<div class="bg-gray-100 pb-20 sm:pb-24 xl:pb-0 pt-24 sm:pt-32">
		<div
			class="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch"
		>
			<div class="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
				<div class="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
					<img
						class="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
						src={ChinchillaTuxedo}
						alt=""
					/>
				</div>
			</div>
			<div class="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
				<figure class="relative isolate pt-6 sm:pt-12">
					<svg
						viewBox="0 0 162 128"
						fill="none"
						aria-hidden="true"
						class="absolute left-0 top-0 -z-10 h-32 stroke-white/20"
					>
						<path
							id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
							d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
						/>
						<use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x="86" />
					</svg>
					<blockquote class="text-xl font-serif leading-8 text-gray-700 sm:text-2xl sm:leading-9">
						<p>
							For over 15 years, we have been rescuing chinchillas and finding them forever homes.
							We are a non-profit organization, and we rely on donations to keep our chinchillas
							happy and healthy.
						</p>
					</blockquote>
					<p class="mt-8 text-base font-semibold text-gray-900 sm:text-lg sm:leading-10">
						<a href="/about" class="text-red-400 hover:text-red-500 hover:underline"
							>Learn more about our rescue <span aria-hidden="true">&rarr;</span>
						</a>
					</p>
				</figure>
			</div>
		</div>
	</div>
</div>

<div class="bg-gray-100 py-24 sm:py-32">
	<div class="relative isolate">
		<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div
				class="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20"
			>
				<img
					class="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
					src="/img/support_us_chin.png"
					alt=""
				/>
				<div class="w-full flex-auto">
					<h2 class="text-3xl font-bold tracking-tight text-black sm:text-4xl">
						Support our rescue
					</h2>
					<p class="mt-6 text-lg leading-8 text-gray-800">
						Donate once or monthly, volunteer your time, or sponsor a chinchilla. We appreciate any
						support you can give.
					</p>
					<p class="mt-6 text-sm leading-8 text-gray-800">
						You can support our rescue in many ways:
					</p>
					<ul
						role="list"
						class="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-black sm:grid-cols-2"
					>
						<li class="flex gap-x-3">
							<svg
								class="h-7 w-5 flex-none"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clip-rule="evenodd"
								/>
							</svg>
							Sponsor a chinchilla
						</li>
						<li class="flex gap-x-3">
							<svg
								class="h-7 w-5 flex-none"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clip-rule="evenodd"
								/>
							</svg>
							Donate shop items
						</li>
						<li class="flex gap-x-3">
							<svg
								class="h-7 w-5 flex-none"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clip-rule="evenodd"
								/>
							</svg>
							Volunteer your time
						</li>
						<li class="flex gap-x-3">
							<svg
								class="h-7 w-5 flex-none"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clip-rule="evenodd"
								/>
							</svg>
							Foster a chinchilla
						</li>
						<li class="flex gap-x-3">
							<svg
								class="h-7 w-5 flex-none"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clip-rule="evenodd"
								/>
							</svg>
							Spread the word
						</li>
						<li class="flex gap-x-3">
							<svg
								class="h-7 w-5 flex-none"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
									clip-rule="evenodd"
								/>
							</svg>
							Contact us with any ideas
						</li>
					</ul>
					<div class="mt-10 flex">
						<a href="/donate" class="text-sm font-semibold leading-6 text-red-400"
							>Donate now <span aria-hidden="true">&rarr;</span></a
						>
					</div>
				</div>
			</div>
		</div>
		<div
			class="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
			aria-hidden="true"
		>
			<div
				class="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#ff6e86] to-[#bd2b4f] opacity-25"
				style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
			/>
		</div>
	</div>
</div>
