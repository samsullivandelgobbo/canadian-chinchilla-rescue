<script lang="ts">
	import type { PageData } from './$types';
	import type { Post, User } from '@prisma/client';
	import PostCard from '$lib/components/PostCard.svelte';

	export let data: PageData;
	console.log(data);
	let posts: Post & { author: User }[] = data.posts;
</script>

<div class="bg-white py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:max-w-4xl">
			<div class="flex flex-col lg:flex-row gap-12">
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
			</div>
			<div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
				<h3 class="text-2xl font-bold tracking-tight text-gray-700">Featured Posts</h3>

				{#each posts as post}
					<PostCard {post} />
				{/each}
			</div>
		</div>
	</div>
</div>
