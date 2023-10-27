<script lang="ts">
	import type { Post } from '@prisma/client';
	import type { PageData } from './$types';

	import { onMount } from 'svelte';
	import { enhance, applyAction } from '$app/forms';
	import type { SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';

	let ToastEditor: any;
	let blogTitle: string = 'Untitled';
	let description: string = '';
	let category: string = 'Fun';
	let image: any = null;
	let mounted = false;
	let loading = false;
	let saveError = false;

	function handleImageChange(event: any) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			image = e.target!.result;
		};

		reader.readAsDataURL(file);
	}

	$: if (post) {
		blogTitle = post.title;
		description = post.description;
		category = post.category;
		image = post.image;
		content = post.content;
	}

	onMount(async () => {
		const module = await import('$lib/components/ToastEditor.svelte');
		ToastEditor = module.default;
		mounted = true;
	});

	let content = '';
	let lastUpdated: Date | null = null;

	export let data: PageData;
	let post: Post | null = data.post as Post;

	if (post) {
		lastUpdated = post.updatedAt;
		blogTitle = post.title;
		content = post.content;
	}

	$: setSlug(blogTitle);

	function handleChange(event: any) {
		content = event.detail;
	}

	const save: SubmitFunction = async ({ formData }) => {
		loading = true;
		formData.set('content', content);
		return async ({ result }) => {
			await applyAction(result);

			console.log($page.form);

			if ($page.form && $page.status === 200) {
				// update last updated
				lastUpdated = new Date();
			} else if ($page.form && $page.status !== 200) {
				saveError = true;
				// show error
			}
			loading = false;
		};
	};

	// set window history
	function setSlug(slug: string) {
		if (mounted) {
			slug = slug
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)+/g, '')
				.replace(/\s+/g, '-')
				.toLowerCase();
			window.history.replaceState(null, '', `/admin/blog/${slug}`);
		}
	}
</script>

<form action="/admin/blog/{blogTitle}" method="POST" use:enhance={save}>
	<div class="bg-gray-100 py-24 min-h-screen">
		<div class="max-w-7xl mx-auto px-6 lg:px-8">
			{#if saveError}
				<div class="rounded-md bg-red-50 p-4">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg
								class="h-5 w-5 text-red-400"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-red-800">There was an error saving your post.</h3>
							<div class="mt-2 text-sm text-red-700">
								<ul role="list" class="list-disc space-y-1 pl-5">
									<li>
										Error message: {$page.form.message}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			{/if}
			<div class="flex flex-row px-8 gap-4 w-full">
				<div class="flex basis-1/4 flex-col">
					<label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900"
						>Cover photo</label
					>

					<div
						class="mt-2 justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-4
              {image ? 'hidden' : 'flex'}
              "
					>
						<div class="text-center">
							<svg
								class="mx-auto h-12 w-12 text-gray-300"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
									clip-rule="evenodd"
								/>
							</svg>
							<div class="mt-4 flex text-sm leading-6 text-gray-600">
								<label
									for="file-upload"
									class="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
								>
									<span>Upload a file</span>
									<input
										id="file-upload"
										name="file-upload"
										type="file"
										class="sr-only"
										accept="image/*"
										on:change={handleImageChange}
									/>
								</label>
								<p class="pl-1">or drag and drop</p>
							</div>
							<p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
						</div>
					</div>
					<div
						class="{image ? 'flex w-full' : 'hidden'}
          relative
          "
					>
						<div
							class="absolute w-full h-full hover:bg-gray-100/30 group
            "
						>
							<button
								type="button"
								class=" flex-col gap-4 items-center justify-center h-full w-full flex
                "
								on:click={() => (image = null)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-12 w-12 text-gray-900 group-hover:opacity-100 opacity-0"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<p class="text-sm leading-5 text-gray-900 group-hover:opacity-100 opacity-0">
									Change
								</p>
							</button>
						</div>
						<img src={image} alt="" class="h-64 w-full rounded-lg object-cover" />
					</div>
				</div>

				<div class="flex basis-3/4 flex-col">
					<div class="flex flex-col p-1">
						<input
							type="text"
							name="title"
							id="title"
							bind:value={blogTitle}
							class=" border border-none hover:underline focus:underline underline-offset-4 hover:cursor-text bg-gray-100 px-4 py-2 mt-2 focus:outline-none focus:ring-0 border-b-2 p-2 focus:border-transparent w-full text-left text-3xl font-bold"
						/>
					</div>
					<div class="flex flex-col jutify-start w-full px-4">
						<div class="col-span-full">
							<label for="description" class="block text-sm font-medium leading-6 text-gray-900"
								>Description</label
							>
							<div class="mt-2">
								<textarea
									id="description"
									name="description"
									bind:value={description}
									rows="3"
									class="block w-full rounded-md max-h-16 border-0 py-1.5 bg-gray-100 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class=" px-4 pt-8">
				<div class="flex flex-row justify-between w-full px-4">
					<div class=" px-4 justify-start">
						<label for="category" class=" text-sm font-medium leading-6 text-gray-900">
							Category
						</label>
						<select
							id="category"
							name="category"
							bind:value={category}
							class=" border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-0 focus:ring-0 sm:text-sm sm:leading-6 bg-gray-100"
						>
							<option> Shop </option>
							<option> Tips </option>
							<option selected> Fun </option>
							<option> Care </option>
							<option> Rescue </option>
						</select>
					</div>
					<div class="justify-end flex">
						<p class="text-gray-500 text-sm text-center items-center inline-flex px-4">
							{#if !loading}
								Last updated: {lastUpdated ? lastUpdated.toLocaleString() : 'Never'}
							{:else}
								Loading...
							{/if}
						</p>

						<button
							type="submit"
							class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-t-lg active:scale-105 transition duration-300"
						>
							Save
						</button>
					</div>
				</div>
				<div class="px-4">
					{#if ToastEditor}
						<svelte:component this={ToastEditor} on:change={handleChange} {content} />
					{/if}
				</div>
			</div>
		</div>
	</div>
</form>
