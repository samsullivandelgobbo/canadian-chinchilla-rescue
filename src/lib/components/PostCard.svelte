<script lang="ts">
	import type { Post, User } from '@prisma/client';

	export let post: Post & { author: User };

	export let admin = false;
</script>

<article class="relative isolate flex flex-col gap-8 lg:flex-row">
	<div class="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
		<img
			src={post.image}
			alt=""
			class="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
		/>
		<div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
	</div>
	<div>
		<div class="flex items-center gap-x-4 text-xs">
			<time datetime="2020-03-16" class="text-gray-500">
				{new Date(post.createdAt).toLocaleDateString()}
			</time>
			<a
				href={admin ? `/admin/blog/${post.slug}` : `/blog/${post.slug}`}
				class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
			>
				Shop
			</a>
		</div>
		<div class="group relative max-w-xl">
			<h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
				<a href={admin ? `/admin/blog/${post.slug}` : `/blog/${post.slug}`}>
					<span class="absolute inset-0" />
					{post.title}
				</a>
			</h3>
			<p class="mt-5 text-sm leading-6 text-gray-600">
				{post.description}
			</p>
		</div>
		<div class="mt-6 flex border-t border-gray-900/5 pt-6 min-w-[16rem]">
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
