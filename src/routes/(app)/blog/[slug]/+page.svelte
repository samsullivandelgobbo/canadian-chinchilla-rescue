<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';

	export let data: PageData;
	let post = data.post;
</script>

<svelte:head>
	<!-- Seo -->
	{#if post}
		<title>{post.title} | Canadian Chinchilla Rescue</title>
		<meta name="description" content={post.description} />
		<meta property="og:title" content={post.title} />
		<meta property="og:description" content={post.description} />
		<meta property="og:image" content={post.image} />
		<meta property="og:url" content={`https://chinchillarescue.ca/blog/${post.slug}`} />
		<meta property="og:type" content="article" />
		<meta property="og:site_name" content="Canadian Chinchilla Rescue" />
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:site" content="@chinchillarescue" />
		<meta name="twitter:title" content={post.title} />
		<meta name="twitter:description" content={post.description} />
		<meta name="twitter:image" content={post.image} />
		<meta name="twitter:url" content={`https://chinchillarescue.ca/blog/${post.slug}`} />
		<meta name="twitter:label1" content="Written by" />
		<meta name="twitter:data1" content={post.author.name} />
		<meta name="twitter:label2" content="Filed under" />
		<meta name="twitter:label3" content="Published on" />
		<meta name="twitter:data3" content={new Date(post.createdAt).toLocaleDateString()} />
		<meta name="twitter:label4" content="Read time" />
		<meta
			name="twitter:data4"
			content={`${Math.ceil(post.content.split(' ').length / 200)} min read`}
		/>
		<meta name="twitter:label5" content="Share" />
		<meta name="twitter:data5" content="Share" />
		<meta name="twitter:label6" content="Donate" />
		<meta name="twitter:data6" content="Donate" />
		<meta name="twitter:label7" content="Shop" />
		<meta name="twitter:data7" content="Shop" />
		<meta name="twitter:label8" content="Adopt" />
		<meta name="twitter:data8" content="Adopt" />
		<meta name="twitter:label9" content="Foster" />
		<meta name="twitter:data9" content="Foster" />
	{/if}
</svelte:head>

{#if post}
	<div class="bg-white py-8 lg:py-16 sm:py-24">
		<div class="mx-auto max-w-3xl px-4 sm:px-6">
			<div class="flex flex-col items-center">
				<div class="flex flex-col lg:flex-row gap-12 w-full">
					<!-- Image -->
					<img
						class=" rounded-xl object-fit lg:h-72 h-auto w-auto lg:mb-8"
						src={post.image}
						alt={post.title}
					/>

					<div class="flex flex-col">
						<!-- Date -->
						<div class="flex flex-row gap-6">
							<p class="text-sm font-semibold leading-7 text-red-400 mb-2">
								<time datetime={new Date(post.createdAt).toISOString()}
									>{new Date(post.createdAt).toLocaleDateString()}</time
								>
							</p>
							<div class="flex items-center justify-center mb-2">
								<p
									class="relative z-10 rounded-full text-sm bg-gray-50 px-2 py-1 font-medium text-gray-600 hover:bg-gray-100"
								>
									Shop
								</p>
							</div>
						</div>
						<!-- Title -->
						<h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
							{post.title}
						</h1>

						<!-- Description -->
						<div class="text-sm leading-7 text-gray-500 mb-6">
							<p>
								{post.description}
							</p>
						</div>

						<p class="font-semibold text-gray-900 block lg:hidden">
							by {post.author.name}
						</p>
						<!-- Author -->
						<div class="mt-6 border-t border-gray-900/5 pt-6 min-w-[16rem] lg:flex hidden">
							<div class="relative flex items-center gap-x-4">
								<img
									src={post.author.avatar ? post.author.avatar : '/logo.png'}
									alt={post.title}
									class="h-10 w-10 rounded-full bg-gray-50"
								/>
								<div class="text-sm leading-6">
									<p class="font-semibold text-gray-900">
										<span class="absolute inset-0" />
										{post.author.name}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Content -->
			</div>
			<div class="flex py-8">
				<p class="prose text-left">
					{@html marked(post.content)}
				</p>
			</div>
		</div>
	</div>
{/if}
