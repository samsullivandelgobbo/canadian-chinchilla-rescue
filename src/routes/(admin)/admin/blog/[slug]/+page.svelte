<script lang="ts">
	import type { Post } from '@prisma/client';
	import type { PageData } from './$types';

	import { onMount } from 'svelte';
	let ToastEditor: any;
	let blogTitle: string = 'Untitled';

	onMount(async () => {
		const module = await import('$lib/components/ToastEditor.svelte');
		ToastEditor = module.default;
	});

	export let data: PageData;
	let post = data.post as Post;
</script>

<div class="bg-gray-100 py-24 min-h-screen">
	<div class="max-w-7xl mx-auto px-6 lg:px-8">
		<form action="/admin/blog/{blogTitle}" method="POST">
			<div class="flex flex-col p-1">
				<input
					type="text"
					name="title"
					id="title"
					bind:value={blogTitle}
					class=" border border-none bg-gray-100 px-4 py-2 mt-2 focus:outline-none focus:ring-0 border-b-2 p-2 focus:border-transparent w-full text-center text-3xl font-bold"
				/>
			</div>
		</form>
		<div class="py-6 px-4">
			<div class="flex flex-row justify-end">
				<p class="text-gray-500 text-sm text-center items-center inline-flex px-4">
					Last updated: {'a'}
				</p>
				<button
					type="submit"
					class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-t-lg active:scale-105 transition duration-300"
				>
					Save
				</button>
			</div>
			{#if ToastEditor}
				<svelte:component this={ToastEditor} on:change={() => console.log('hello')} />
			{/if}
		</div>
	</div>
</div>
