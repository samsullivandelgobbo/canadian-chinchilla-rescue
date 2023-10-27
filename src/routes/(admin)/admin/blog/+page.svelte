<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import type { Post, User } from '@prisma/client';
	import type { PageData } from '../$types';
	export let data: PageData;

	let posts = data.posts as Post & { author: User }[];
</script>

<div class="bg-white py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-4xl">
			<!-- <div class="flex flex-col lg:flex-row gap-12">
				<img class="rounded-lg object-fit h-64 w-96" src="/img/chinchilla_sunset_blog.png" alt="" />
				<div class="flex flex-col gap-8">
					<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
						Welcome to our blog
					</h2>
					<p class="mt-2 text-lg leading-8 text-gray-600">
						Learn more about chinchillas and how to take care of them. We will be posting new
						articles regularly, so check back often.
					</p>
				</div>
			</div> -->
			<div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
				<div class="flex flex-row justify-between">
					<h3 class="text-2xl font-bold tracking-tight text-gray-700">Featured Posts</h3>
					<a
						href="/admin/blog/new"
						class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg active:scale-105 transition duration-300"
					>
						New Post
					</a>
				</div>
				{#each posts as post}
					<PostCard {post} />
				{/each}

				<!-- More posts... -->
			</div>
		</div>
	</div>
</div>
