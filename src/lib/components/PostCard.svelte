<script lang="ts">
	import type { Post, User } from '@prisma/client';
	import Separator from './ui/separator/separator.svelte';

	export let post: Post & { author: User };

	export let admin = false;
</script>

<article class="relative isolate flex flex-col gap-8 lg:flex-row">
	<div class="relative max-w-md aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
		<img
			src={post.image}
			alt=""
			class="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
		/>
		<div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
	</div>
	<div class="w-full">
		<div class="flex items-center gap-x-4 text-xs">
			<time datetime="2020-03-16" class="text-gray-500">
				{new Date(post.createdAt).toLocaleDateString()}
			</time>
			<a
				href={admin ? `/admin/blog/${post.id}` : `/blog/${post.id}`}
				class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
			>
				{#each post.tags as tag}
					<span class="absolute inset-0" />
					{tag}
				{/each}
			</a>
		</div>
		<div class="group relative max-w-xl">
			<h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
				<a href={admin ? `/admin/blog/${post.id}` : `/blog/${post.id}`}>
					<span class="absolute inset-0" />
					{post.title}
				</a>
			</h3>
			<p class="mt-5 text-sm leading-6 text-gray-600">
				{post.description}
			</p>
		</div>
		<Separator class="my-4 " />

		<div class=" flex min-w-[16rem]">
			<div class="relative flex items-center gap-x-4">
				<img src={'/logo.png'} alt={post.title} class="h-10 w-10 rounded-full bg-gray-50" />
				<div class="text-sm leading-6">
					<p class="font-semibold text-gray-900">
						<span class="absolute inset-0" />
						{post.author.name}
					</p>
				</div>
			</div>
		</div>
	</div>
</article>
