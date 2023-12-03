<script lang="ts">
  import type {Chinchilla} from '@prisma/client'
  import RescueChinCard from '$lib/components/RescueChinCard.svelte'


  export let data: PageData

  const chinchillas: Chinchilla[] = data.chinchillas

</script>

<svelte:head>
	<!-- Seo -->
	<title>Adopt | Canadian Chinchilla Rescue</title>
	<meta
		name="description"
		content="We have a lot of chinchillas that need a home. If you are interested in adopting a chinchilla, please contact us. We will help you find the perfect chinchilla for you."
	/>
</svelte:head>

<div class="bg-gray-50">
	<div class="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
		<div class="mx-auto max-w-2xl px-4 lg:max-w-none">
			<div class="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
				<div>
					<h2 class="text-4xl font-bold tracking-tight text-gray-900">
						Help find a home for a chinchilla
					</h2>
					<p class="mt-4 text-gray-500">
						We have a lot of chinchillas that need a home. If you are interested in adopting a
						chinchilla, please contact us. We will help you find the perfect chinchilla for you.
					</p>

					<a
						href="/adopt/application"
						class="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium text-center text-black bg-gray-100 border-gray-500 border-2 rounded-lg hover:bg-gray-200 focus:ring-0"
						>Get started</a
					>
				</div>

				<div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg bg-gray-100">
					<img src="/img/adopt_dont_shop.png" alt="" class="object-cover object-center" />
				</div>
			</div>
			<div class="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
				<div class="sm:flex lg:block">
					<div class="sm:flex-shrink-0">
						<img class="h-16 w-16 object-cover" src="/img/heart_chinchilla_icon.png" alt="" />
					</div>
					<div class="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
						<h3 class="text-sm font-medium text-gray-900">Make a difference</h3>
						<p class="mt-2 text-sm text-gray-500">
							Adopting a chinchilla is a great way to make a difference in the world. You will be
							helping to save a life and give a chinchilla a loving home.
						</p>
					</div>
				</div>
				<div class="sm:flex lg:block">
					<div class="sm:flex-shrink-0">
						<img class="h-16 w-16 object-cover" src="/img/chinchilla_icon2.png" alt="" />
					</div>
					<div class="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
						<h3 class="text-sm font-medium text-gray-900">Unsure about adopting?</h3>
						<p class="mt-2 text-sm text-gray-500">
							We understand that adopting a chinchilla is a big decision. If you are unsure about a
							lifestyle change, you can foster a chinchilla. This will give you a chance to see if
							you are ready to adopt.
						</p>
					</div>
				</div>
				<div class="sm:flex lg:block">
					<div class="sm:flex-shrink-0">
						<img class="h-16 w-16 object-cover" src="/img/chinchilla_icon3.png" alt="" />
					</div>
					<div class="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
						<h3 class="text-sm font-medium text-gray-900">Have questions?</h3>
						<p class="mt-2 text-sm text-gray-500">
							We are happy to answer any questions you may have about adopting a chinchilla.
							However, please review the content on our website before contacting us. Especially our <a
								href="/blog"
								class="underline text-red-400">blog</a
							>
							& <a href="/care" class="underline text-red-400">care guide</a>
							, which has a lot of information about chinchillas.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="bg-white py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="flex w-full flex-col">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our family</h2>
			<div class="grid sm:grid-cols-2 gap-4">
				<p class="mt-6 text-gray-600">
					Our chinchillas are our family. We love them and care for them as if they were our own
					children. We want to make sure that they have the best life possible. For these reasons,
					we only adopt to people who are willing to give their chinchillas the love and care they
					require.
				</p>

				<p class="mt-6 text-gray-600">
					Our adoption process consists of a few steps. First, you will need to fill out an
					<a href="/adopt/application" class="text-red-500 underline hover:text-red-400"
						>application form</a
					>. This will help us get to know you and your family. Next, we will schedule a home visit.
					This is to ensure that your home is safe for a chinchilla. Finally, we will schedule a
					time for you to meet the chinchilla you are interested in adopting. If everything goes
					well, you will be able to take your new chinchilla home with you.
				</p>
			</div>
		</div>
		<div

			class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
		>
      {#each chinchillas as chinchilla} 
      <RescueChinCard {chinchilla} />
      {/each}
  </div>
	</div>
</div>
