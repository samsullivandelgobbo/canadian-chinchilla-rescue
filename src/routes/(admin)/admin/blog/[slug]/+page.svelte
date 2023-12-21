<script lang="ts">
	import type { Post } from '@prisma/client';
	import type { PageData } from './$types';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';

	import { onMount } from 'svelte';
	import { enhance, applyAction } from '$app/forms';
	import type { SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { Label } from '$lib/components/ui/label';
	import { Trash } from 'lucide-svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import * as Select from '$lib/components/ui/select';
	import * as Alert from '$lib/components/ui/alert';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	let ToastEditor: any;
	let blogTitle: string = 'Untitled';
	let description: string = '';
	let category: string = 'Fun';
	let image: any = null;
	let published = false;
	let mounted = false;
	let awaitSave = false;
	let saveError = false;
	let saveSuccess = false;
	let deletePostCheck = false;
	let awaitingDelete = false;
	let form: HTMLFormElement;

	export let data: PageData;

	let content = '';
	let lastUpdated: Date | null = null;
	let autosave = true;
	let post: Post | null = data.post as Post;

	$: setSlug(blogTitle);

	$: if (post) {
		blogTitle = post.title;
		description = post.description;
		category = post.category;
		image = post.image;
		content = post.content;
		published = post.published;
	}

	if (post) {
		lastUpdated = post.updatedAt;
		blogTitle = post.title;
		content = post.content;
	}

	function handleChange(event: any) {
		content = event.detail;
		console.log('change');
		if (autosave) {
			// submit form
			form.dispatchEvent(new Event('submit'));
		}
	}

	function handleImageChange(event: any) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			image = e.target!.result;
		};

		reader.readAsDataURL(file);
	}

	onMount(async () => {
		const module = await import('$lib/components/ToastEditor.svelte');
		ToastEditor = module.default;
		mounted = true;
	});

	const save: SubmitFunction = async ({ formData }) => {
		awaitSave = true;
		formData.set('content', content);
		formData.set('published', JSON.stringify(published));
		console.log(published);
		return async ({ result }) => {
			await applyAction(result);

			console.log($page.form);

			if ($page.form && $page.status === 200) {
				// update last updated
				lastUpdated = new Date();
				saveSuccess = true;
			} else if ($page.form && $page.status !== 200) {
				saveError = true;
				// show error
			}
			awaitSave = false;
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

	const deletePost = async () => {
		awaitingDelete = true;
		const res = await fetch(`/admin/blog/${post.slug}`, {
			method: 'DELETE'
		});

		if (res.status === 200) {
			window.location.href = '/admin/blog';
		}
	};

	let categories = [
		{ value: 'shop', label: 'Shop' },
		{ value: 'tips', label: 'Tips' },
		{ value: 'fun', label: 'Fun' },
		{ value: 'care', label: 'Care' },
		{ value: 'rescue', label: 'Rescue' }
	];
</script>

<!-- <Form.Root>



  </Form.Root> -->

<form
	action="/admin/blog/{blogTitle}"
	method="POST"
	use:enhance={save}
	enctype="multipart/form-data"
	bind:this={form}
>
	<div class="bg-gray-100 py-24 min-h-screen">
		<div class="max-w-4xl mx-auto">
			{#if saveError}
				<Alert.Root variant="destructive">
					<Alert.Title>Error Saving</Alert.Title>
					<Alert.Description>
						There was an error saving your post. Please try again.
					</Alert.Description>
				</Alert.Root>
			{/if}
			{#if saveSuccess}
				<Alert.Root>
					<Alert.Title>Success!</Alert.Title>
					<Alert.Description>Your post has been saved.</Alert.Description>
				</Alert.Root>
			{/if}

			<div class="flex flex-row px-4 gap-4 w-full">
				<div class="flex basis-full flex-col">
					<div class="flex flex-col jutify-start w-full px-4">
						<div class="col-span-full">
							<div class="bg-white shadow sm:rounded-lg px-4 py-5">
								<div class="flex flex-col p-1">
									<Label for="title">Title</Label>

									<div class="mt-2 gap-4 flex flex-col sm:items-start sm:justify-between">
										<div class="max-w-xl text-sm text-gray-500">
											<p>Write a title for the post.</p>
										</div>
										<Input name="title" bind:value={blogTitle} />
									</div>
								</div>

								<Label for="description">Description</Label>

								<div class="mt-2 gap-4 flex flex-col sm:items-start sm:justify-between">
									<div class="max-w-xl text-sm text-gray-500">
										<p>Write a short description for this post.</p>
									</div>
									<Textarea name="description" bind:value={description} />
								</div>

								<h3 class="text-base font-semibold leading-6 text-gray-900">Post Category</h3>
								<div class="mt-2 sm:flex sm:items-start sm:justify-between">
									<div class="max-w-xl text-sm text-gray-500">
										<p>Select a category for this post. This will help users find your post.</p>
									</div>

									<Select.Root portal={null} name="category">
										<Select.Trigger class="w-[180px]" name="category">
											<Select.Value placeholder="Select a category" />
										</Select.Trigger>
										<Select.Content>
											<Select.Group>
												<Select.Label>Categories</Select.Label>
												{#each categories as category}
													<Select.Item value={category.value} label={category.label}
														>{category.label}</Select.Item
													>
												{/each}
											</Select.Group>
										</Select.Content>
										<Select.Input name="category" value={post ? post.category : category} />
									</Select.Root>
								</div>

								<div class="px-4 py-5 sm:p-6">
									<h3
										class="text-base font-semibold leading-6 text-gray-900"
										id="renew-subscription-label"
									>
										Publish Post
									</h3>
									<div class="mt-2 sm:flex sm:items-start sm:justify-between">
										<div class="max-w-xl text-sm text-gray-500">
											<p id="renew-subscription-description">
												Publishing this post will make it visible to the public.
											</p>
										</div>
										<div class="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
											<Switch bind:checked={published} />

											<!-- <button
                    on:click={() => (published = !published)}
                    type="button"
                    class="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
                    {published ? 'bg-red-400' : 'bg-gray-200'}
                    "
                    role="switch"
                    aria-checked="false"
                    aria-labelledby="renew-subscription-label"
                    aria-describedby="renew-subscription-description"
                  >
                    <span
                      aria-hidden="true"
                      class="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                      {published ? 'translate-x-5' : 'translate-x-0'}
                      "
                    />
                  </button> -->
										</div>
									</div>
								</div>

								<!-- <label for="description" class="block text-sm font-medium leading-6 text-gray-900"
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
							</div> -->
							</div>
						</div>

						<div class=" pt-4">
							<div class="flex flex-row justify-between w-full px-4">
								<div class=" px-4 justify-start items-center flex gap-4">
									<Label for="autosave">Autosave</Label>
									<Switch bind:checked={autosave} />
								</div>
								<div class="justify-end flex">
									<p class="text-gray-500 text-sm text-center items-center inline-flex px-4">
										{#if !awaitSave}
											{lastUpdated
												? 'Last updated ' +
												  lastUpdated.toLocaleDateString('en', {
														year: 'numeric',
														month: 'long',
														day: 'numeric',
														hour: 'numeric',
														minute: 'numeric'
												  })
												: 'Not saved'}
										{:else}
											Saving...
										{/if}
									</p>

									<Button
										type="submit"
										class="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-t-lg active:scale-105 transition duration-300"
									>
										Save
									</Button>
								</div>
							</div>
							<div class="px-4">
								{#if ToastEditor}
									<svelte:component this={ToastEditor} on:change={handleChange} {content} />
								{/if}
							</div>
						</div>
						<div class="flex flex-col gap-8 py-18 mt-12">
							<!-- <div class="bg-white shadow sm:rounded-lg p-4"> -->
							<Label>Cover photo</Label>

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
								class="{image ? 'flex  ' : 'hidden'}
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
										<Trash class="h-12 w-12 text-gray-900/50 opacity-0 group-hover:opacity-100" />
										<p class="text-sm leading-5 text-gray-900 group-hover:opacity-100 opacity-0">
											Change
										</p>
									</button>
								</div>
								<img src={image} alt="" class="  rounded-lg object-cover" />
							</div>

							<div class="bg-white shadow sm:rounded-lg">
								<div class="px-4 py-5 sm:p-6">
									<h3
										class="text-base font-semibold leading-6 text-gray-900"
										id="renew-subscription-label"
									>
										Publish Post
									</h3>
									<div class="mt-2 sm:flex sm:items-start sm:justify-between">
										<div class="max-w-xl text-sm text-gray-500">
											<p id="renew-subscription-description">
												Publishing this post will make it visible to the public.
											</p>
										</div>
										<div class="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
											<Switch bind:checked={published} />

											<!-- <button
									on:click={() => (published = !published)}
									type="button"
									class="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
                  {published ? 'bg-red-400' : 'bg-gray-200'}
                  "
									role="switch"
									aria-checked="false"
									aria-labelledby="renew-subscription-label"
									aria-describedby="renew-subscription-description"
								>
									<span
										aria-hidden="true"
										class="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                    {published ? 'translate-x-5' : 'translate-x-0'}
                    "
									/>
								</button> -->
										</div>
									</div>
								</div>

								<div class="bg-white shadow sm:rounded-lg">
									<div class=" py-5 sm:p-6">
										<h3 class="text-base font-semibold leading-6 text-gray-900">Delete Post</h3>
										<div class="mt-2 sm:flex sm:items-start sm:justify-between">
											<div class="max-w-xl text-sm text-gray-500">
												<p>Delete this post. This action cannot be undone.</p>
											</div>
											<div class="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
												<AlertDialog.Root>
													<AlertDialog.Trigger asChild let:builder>
														<Button builders={[builder]} variant="destructive">Show Dialog</Button>
													</AlertDialog.Trigger>
													<AlertDialog.Content>
														<AlertDialog.Header>
															<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
															<AlertDialog.Description>
																This action cannot be undone. This will permanently delete your
																account and remove your data from our servers.
															</AlertDialog.Description>
														</AlertDialog.Header>
														<AlertDialog.Footer>
															<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
															<AlertDialog.Action>Continue</AlertDialog.Action>
														</AlertDialog.Footer>
													</AlertDialog.Content>
												</AlertDialog.Root>
												<!-- <button
										type="button"
										on:click={() => (deletePostCheck = true)}
										class="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
									>
										Delete
									</button> -->
											</div>
										</div>
									</div>
								</div>

								<!-- end -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>

{#if deletePostCheck}
	<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

	<div class="fixed inset-0 z-50 w-screen overflow-y-auto">
		<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
			<!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
			<div
				class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
			>
				<div class="sm:flex sm:items-start z-50">
					<div
						class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
					>
						<svg
							class="h-6 w-6 text-red-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
							/>
						</svg>
					</div>
					<div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
						<h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
							Delete Post
						</h3>
						<div class="mt-2">
							<p class="text-sm text-gray-500">Are you sure you want to delete this post?</p>
						</div>
					</div>
				</div>
				<div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
					<button
						on:click={deletePost}
						type="button"
						class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
					>
						{#if awaitingDelete}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="animate-spin text-white"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M12 3a9 9 0 1 0 9 9" />
							</svg>
						{:else}
							Delete
						{/if}
					</button>
					<button
						on:click={() => (deletePostCheck = false)}
						type="button"
						class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
						>Cancel</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}

<style global>
	.toastui-editor-contents {
		z-index: 0 !important;
	}

	:global([ref='editor']) {
		z-index: 0 !important;
	}
</style>
