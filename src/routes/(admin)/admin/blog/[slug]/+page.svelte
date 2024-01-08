<script lang="ts">
	import type { Draft, Post } from '@prisma/client';
	import type { PageData } from './$types';
	import debounce from 'debounce';

	import { Button } from '$lib/components/ui/button';
	import cuid from 'cuid';

	import {
		ChevronLeft,
		Heading1,
		Heading2,
		Heading3,
		Heading4,
		Heading5,
		Heading6,
		Trash,
		Type
	} from 'lucide-svelte';

	import * as Select from '$lib/components/ui/select';

	import Publish from './publish.svelte';
	import Preview from './preview.svelte';

	import { Bold, Italic, Underline } from 'lucide-svelte';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';

	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';

	let element: any;
	let editor: any;

	let disabled = false;

	let interval: any;

	const textTypes = [
		{
			label: 'Heading 1',
			level: 1,
			icon: Heading1,
			onSelect: () => {
				editor.chain().focus().toggleHeading({ level: 1 }).run();
			}
		},
		{
			label: 'Heading 2',
			level: 2,
			icon: Heading2,
			onSelect: () => {
				editor.chain().focus().toggleHeading({ level: 2 }).run();
			}
		},
		{
			label: 'Heading 3',
			level: 3,
			icon: Heading3,
			onSelect: () => {
				editor.chain().focus().toggleHeading({ level: 3 }).run();
			}
		},
		{
			label: 'Heading 4',
			level: 4,
			icon: Heading4,
			onSelect: () => {
				editor.chain().focus().toggleHeading({ level: 4 }).run();
			}
		},
		{
			label: 'Heading 5',
			level: 5,
			icon: Heading5,
			onSelect: () => {
				editor.chain().focus().toggleHeading({ level: 5 }).run();
			}
		},
		{
			label: 'Heading 6',
			level: 6,
			icon: Heading6,
			onSelect: () => {
				editor.chain().focus().toggleHeading({ level: 6 }).run();
			}
		},
		{
			label: 'Paragraph',
			level: 0,
			icon: Type,
			onSelect: () => {
				// reset to paragraph
				editor.chain().focus().setParagraph().run();
			}
		}
	];

	let debouncedSaveDraft: any;

	function autosave() {
		console.log('autosave');

		if (!debouncedSaveDraft) {
			debouncedSaveDraft = debounce(async () => {
				console.log('saving');

				await saveDraft();
				console.log('saved');
			}, 500);
		}

		debouncedSaveDraft();
	}

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: 'Write here...'
				})
			],
			content: post?.content,
			// on style change
			onUpdate: () => {
				post.content = editor.getHTML();
				autosave();
			},

			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});

		interval = setInterval(() => {}, 60000); // Update every minute

		mounted = true;
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
		if (editor) {
			editor.destroy();
		}
	});

	let mounted = false;

	let saveStatus: 'saved' | 'saving' | 'unsaved' | 'error' = 'unsaved';

	export let data: PageData;

	let lastSavedTime: Date | null = null;

	function timeSince(date) {
		const seconds = Math.floor((new Date() - date) / 1000);

		let interval = seconds / 31536000; // Calculate years
		if (interval > 1) {
			return Math.floor(interval) + ' years ago';
		}
		interval = seconds / 2592000; // Calculate months
		if (interval > 1) {
			return Math.floor(interval) + ' months ago';
		}
		interval = seconds / 86400; // Calculate days
		if (interval > 1) {
			return Math.floor(interval) + ' days ago';
		}
		interval = seconds / 3600; // Calculate hours
		if (interval > 1) {
			return Math.floor(interval) + ' hours ago';
		}
		interval = seconds / 60; // Calculate minutes
		if (interval > 1) {
			return Math.floor(interval) + ' minutes ago';
		}
		return Math.floor(seconds) + ' seconds ago';
	}

	let post: Draft =
		data.draft ||
		({
			title: '',
			description: '',
			content: ''
		} as Draft);

	let blogId = post?.id || cuid();

	$: if (post && post.updatedAt) {
		lastSavedTime = new Date(post.updatedAt);
		saveStatus = 'saved';
	}

	async function saveDraft() {
		if (!post) {
			setSlug(blogId);
		}

		saveStatus = 'saving';

		const res = await fetch(`/api/blog/draft/${blogId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: post?.title,
				description: post?.description,
				content: post?.content
			})
		});

		if (res.status === 200) {
			const data = await res.json();
			console.log(data);

			saveStatus = 'saved';
			lastSavedTime = new Date(); // Capture the save time
		} else {
			saveStatus = 'unsaved';
		}
	}
	// set window history
	function setSlug(slug: string) {
		console.log('set slug');
		if (mounted) {
			window.history.replaceState(null, '', `/admin/blog/${slug}`);
		}
	}
</script>

<div class="flex flex-row justify-between w-full py-4 sm:px-8">
	<div class="flex flex-row gap-4">
		<Button
			variant="ghost"
			class="rounded-full border border-gray-300 hover:bg-gray-100 transition duration-300"
			size="icon"
			href="/admin/blog"
		>
			<ChevronLeft class="h-6 w-6" />
		</Button>

		<div class="flex flex-row gap-2 items-center">
			<div class="h-2 w-2 bg-green-300 rounded-full items-center" />

			{#if saveStatus === 'saving'}
				<p class="text-xs text-gray-500">Saving...</p>
			{:else if saveStatus === 'saved'}
				<p class="text-xs text-gray-500">
					Draft saved {lastSavedTime ? timeSince(lastSavedTime) : ''}
				</p>
			{:else}
				<p class="text-xs text-gray-500">Unsaved</p>
			{/if}
		</div>
	</div>

	<div class="flex flex-row gap-4">
		<!-- <Preview /> -->
		<Publish {post} {disabled} />
	</div>
</div>

<div class="flex w-full border-t border-b border-gray-200 py-1 sm:px-8">
	{#if editor}
		<Select.Root portal={null}>
			<Select.Trigger
				class="w-[180px]
      border-0 focus:border-0 focus:ring-0 focus:ring-offset-0  focus:outline-none
      "
			>
				<Select.Value placeholder="Style" />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					{#each textTypes as textType}
						<button on:click={textType.onSelect}>
							<Select.Item
								class="flex flex-row items-center gap-2 "
								value={textType.level}
								label={textType.label}
							>
								<svelte:component this={textType.icon} class="h-4 w-4" />

								{textType.label}
							</Select.Item>
						</button>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input name="favoriteFruit" />
		</Select.Root>

		<ToggleGroup.Root type="multiple">
			<ToggleGroup.Item
				value="bold"
				aria-label="Toggle bold"
				data-state={editor.isActive('bold') ? 'on' : 'off'}
			>
				<button
					on:click={() => {
						editor.chain().focus().toggleBold().run();
					}}
				>
					<Bold class="h-4 w-4" />
				</button>
			</ToggleGroup.Item>
			<ToggleGroup.Item
				value="italic"
				aria-label="Toggle italic"
				data-state={editor.isActive('italic') ? 'on' : 'off'}
			>
				<button
					on:click={() => {
						editor.chain().focus().toggleItalic().run();
					}}
				>
					<Italic class="h-4 w-4" />
				</button>
			</ToggleGroup.Item>
			<ToggleGroup.Item
				value="strikethrough"
				aria-label="Toggle strikethrough"
				data-state={editor.isActive('strike') ? 'on' : 'off'}
			>
				<button
					on:click={() => {
						editor.chain().focus().toggleStrike().run();
					}}
				>
					<Underline class="h-4 w-4" />
				</button>
			</ToggleGroup.Item>
		</ToggleGroup.Root>
	{/if}
</div>

<div class="flex flex-row sm:px-4 gap-4 w-full">
	<div class="flex basis-full flex-col">
		<div class="flex flex-col jutify-start w-full sm:px-4">
			<div class="col-span-full">
				<input
					name="title"
					class="flex h-16 text-2xl w-full rounded-md border-input bg-transparent px-3 py-2 placeholder-gray-500 font-semibold
             ring-offset-background ring-0 focus:ring-0 focus:ring-offset-0 focus:border-0 focus:outline-none"
					placeholder="Enter a title..."
					bind:value={post.title}
					on:input={() => {
						autosave();
					}}
				/>

				<input
					name="description"
					class="flex h-14 text-lg w-full rounded-md border-input bg-transparent px-3 py-2
           ring-offset-background ring-0 focus:ring-0 focus:ring-offset-0 focus:border-0 focus:outline-none"
					placeholder="Enter a short description..."
					bind:value={post.description}
					on:input={() => {
						autosave();
					}}
				/>
				<div bind:this={element} class="prose px-3" />
			</div>
		</div>
	</div>
</div>
