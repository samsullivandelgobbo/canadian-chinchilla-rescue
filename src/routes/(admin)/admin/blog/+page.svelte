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
			<div class="flex flex-col lg:flex-row gap-12">
				<img class="rounded-lg object-fit h-64 w-96" src="/img/chinchilla_sunset_blog.png" alt="" />
				<div class="flex flex-col gap-8">
					<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Blog Posts</h2>
					<p class="mt-2 text-lg leading-8 text-gray-600">
						Add new posts, edit existing posts, and delete posts.
					</p>
				</div>
			</div>
			<div class="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
				<div class="flex flex-row justify-between">
					{#if posts.length > 0}
						<a
							href="/admin/blog/new"
							class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg active:scale-105 transition duration-300"
						>
							New Post
						</a>
					{/if}
				</div>
				{#each posts as post}
					<PostCard {post} admin={true} />
				{/each}

				{#if posts.length === 0}
					<div class="text-center">
						<svg
							class="mx-auto h-12 w-12 text-gray-400"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								vector-effect="non-scaling-stroke"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
							/>
						</svg>
						<h3 class="mt-2 text-sm font-semibold text-gray-900">No posts yet</h3>
						<p class="mt-1 text-sm text-gray-500">Get started by creating a new post.</p>
						<div class="mt-6">
							<a
								href="/admin/blog/new"
								class="inline-flex items-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
							>
								<svg
									class="-ml-0.5 mr-1.5 h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
									/>
								</svg>
								New Post
							</a>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
