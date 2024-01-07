<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { mediaQuery } from 'svelte-legos';

	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { Check, ChevronsDownUpIcon, ChevronsUpDown, Trash } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import confetti from 'canvas-confetti';

	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');
	let submitting = false;

	let image: any = null;
	export let disabled: boolean = false;

	function handleImageChange(event: any) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			// set image to base64 string
			const base64String = e.target.result;
			image = base64String;
		};

		reader.readAsDataURL(file);
	}

	import * as Select from '$lib/components/ui/select';
	import type { Draft } from '@prisma/client';
	import { cn } from '$lib/utils';

	let selectedTags: string[] = [];

	const tags = ['Rescue', 'Shop', 'Adoption', 'Care', 'Stories', 'News', 'Tips', 'Events'];

	export let post;
	console.log(post);

	let end = Date.now() + 5 * 1000;
	let colors = ['#ff0000', '#00ff00', '#0000ff'];

	function successConfetti() {
		confetti({
			particleCount: 2,
			angle: 60,
			spread: 55,
			origin: { x: 0 },
			colors: colors
		});
		confetti({
			particleCount: 2,
			angle: 120,
			spread: 55,
			origin: { x: 1 },
			colors: colors
		});

		if (Date.now() < end) {
			requestAnimationFrame(successConfetti);
		}
	}

	async function publish() {
		console.log(post);
		if (!post) {
			toast.error('Error publishing post');
		}
		submitting = true;
		console.log('Submitting');

		const res = await fetch(`/api/blog/publish`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: post.title,
				description: post.description,
				content: post.content,
				coverPhoto: image,
				tags: selectedTags
			})
		});

		if (res.status === 200) {
			const data = await res.json();
			console.log('Success', data);
			const post = data.post;
			console.log(post);
			toast.success('Post published successfully');
			successConfetti();
		} else {
			console.log('Error');
			const data = await res.json();
			console.log(data);
			toast.error('Error publishing post');
		}
		submitting = false;
	}
</script>

{#if $isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Trigger asChild let:builder>
			<Button variant="default" builders={[builder]} {disabled}>Continue</Button>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[100vw] w-full h-full max-h-screen">
			<Dialog.Header>
				<Dialog.Title class="text-center text-2xl">Publish</Dialog.Title>
				<Separator class="my-4" />
			</Dialog.Header>
			<div class="flex flex-col gap-4 max-w-2xl mx-auto w-full">
				<!-- <div class="flex flex-row w-full items-center justify-between rounded-lg border p-4">
					<div class="space-y-0.5">
						<Label for="email">Email</Label>
					</div>
					<Switch />
				</div> -->
				<div class="flex flex-row w-full items-center justify-between rounded-lg border p-4">
					<div class="space-y-0.5">
						<Label for="email">Tags</Label>
					</div>
					<Popover.Root>
						<Popover.Trigger let:builder asChild>
							<Button
								builders={[builder]}
								variant="outline"
								role="combobox"
								type="button"
								class="min-w-[200px] md:max-w-[200px] justify-between overflow-hidden"
							>
								Select tags
								<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</Popover.Trigger>
						<Popover.Content class="max-w-[200px] min-w-[200px] p-0 z-50">
							<Command.Root>
								<Command.Input autofocus placeholder="Search tags..." />
								<Command.Empty>No tags found</Command.Empty>
								<Command.Group>
									<!-- TODO: add tag feature -->
									<!-- <Command.Item /> -->

									{#each tags as tag}
										<Command.Item value={tag} onSelect={(value) => {}}>
											<Check
												class={cn(
													'mr-2 h-4 w-4',
													selectedTags.includes(tag) ? 'text-red-500' : 'text-transparent'
												)}
											/>
											{tag}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>
				</div>

				<div class="flex flex-col gap-4 py-18 mt-12">
					<!-- <div class="bg-white shadow sm:rounded-lg p-4"> -->
					<Label>Cover photo</Label>
					<label for="file-upload">
						<div
							class=" justify-center rounded-lg border border-gray-200 px-6 py-4
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
					</label>

					<div
						class="{image ? 'flex  ' : 'hidden'}
            relative
            "
					>
						<div class="absolute top-4 right-4">
							<button
								type="button"
								class=" flex flex-row gap-4 items-center justify-center h-full w-full py-2 px-3 hover:bg-gray-200 text-sm bg-white rounded-xl shadow-md
                  "
								on:click={() => (image = null)}
							>
								<Trash class="h-5 w-5 text-red-500  " />
								Remove
							</button>
						</div>
						<img src={image} alt="" class="  rounded-lg object-cover" />
					</div>
				</div>
			</div>

			<Dialog.Footer class="h-full  ">
				<div class="h-full flex flex-col justify-between items-baseline w-full">
					<div class="flex-1 h-full" />
					<Separator class="my-4" />

					<div class="flex flex-row gap-4 w-full justify-end items-baseline">
						<Button variant="outline" on:click={() => (open = false)}>Cancel</Button>
						<Button
							disabled={!image}
							variant="default"
							on:click={() => {
								publish();
							}}
							>Publish Now
							{#if submitting}
								<svg
									width="24"
									height="24"
									class="text-white ml-2"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									><style>
										.spinner_9y7u {
											animation: spinner_fUkk 2.4s linear infinite;
											animation-delay: -2.4s;
										}
										.spinner_DF2s {
											animation-delay: -1.6s;
										}
										.spinner_q27e {
											animation-delay: -0.8s;
										}
										@keyframes spinner_fUkk {
											8.33% {
												x: 13px;
												y: 1px;
											}
											25% {
												x: 13px;
												y: 1px;
											}
											33.3% {
												x: 13px;
												y: 13px;
											}
											50% {
												x: 13px;
												y: 13px;
											}
											58.33% {
												x: 1px;
												y: 13px;
											}
											75% {
												x: 1px;
												y: 13px;
											}
											83.33% {
												x: 1px;
												y: 1px;
											}
										}
									</style><rect
										class="spinner_9y7u"
										x="1"
										y="1"
										rx="1"
										width="10"
										height="10"
									/><rect
										class="spinner_9y7u spinner_DF2s"
										x="1"
										y="1"
										rx="1"
										width="10"
										height="10"
									/><rect
										class="spinner_9y7u spinner_q27e"
										x="1"
										y="1"
										rx="1"
										width="10"
										height="10"
									/></svg
								>
							{/if}
						</Button>
					</div>
				</div>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger asChild let:builder>
			<Button variant="default" builders={[builder]} {disabled}>Continue</Button>
		</Drawer.Trigger>
		<Drawer.Content class="px-4">
			<Drawer.Header class="text-left">
				<Drawer.Title class="text-center text-2xl">Publish</Drawer.Title>
			</Drawer.Header>

			<div class="flex flex-col gap-4 max-w-2xl mx-auto w-full">
				<!-- <div class="flex flex-row w-full items-center justify-between rounded-lg border p-4">
					<div class="space-y-0.5">
						<Label for="email">Email</Label>
					</div>
					<Switch />
				</div> -->
				<div class="flex flex-row w-full items-center justify-between rounded-lg border p-4">
					<div class="space-y-0.5">
						<Label for="email">Category</Label>
					</div>
					<Select.Root portal={null}>
						<Select.Trigger class="w-[180px]">
							<Select.Value placeholder="Select a fruit" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label />
								{#each fruits as fruit}
									<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input name="favoriteFruit" />
					</Select.Root>
				</div>

				<div class="flex flex-col gap-4 py-18 mt-12">
					<!-- <div class="bg-white shadow sm:rounded-lg p-4"> -->
					<Label>Cover photo</Label>
					<label for="file-upload">
						<div
							class=" justify-center rounded-lg border border-gray-200 px-6 py-4
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
					</label>

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
				</div>
			</div>

			<Drawer.Footer class="px-0">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]} on:click={() => (open = false)}
						>Cancel</Button
					>
					<Button
						variant="default"
						builders={[builder]}
						on:click={() => {
							publish();
						}}
						>Publish Now
						{#if submitting}
							<svg
								width="24"
								height="24"
								class="text-white ml-2"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								><style>
									.spinner_9y7u {
										animation: spinner_fUkk 2.4s linear infinite;
										animation-delay: -2.4s;
									}
									.spinner_DF2s {
										animation-delay: -1.6s;
									}
									.spinner_q27e {
										animation-delay: -0.8s;
									}
									@keyframes spinner_fUkk {
										8.33% {
											x: 13px;
											y: 1px;
										}
										25% {
											x: 13px;
											y: 1px;
										}
										33.3% {
											x: 13px;
											y: 13px;
										}
										50% {
											x: 13px;
											y: 13px;
										}
										58.33% {
											x: 1px;
											y: 13px;
										}
										75% {
											x: 1px;
											y: 13px;
										}
										83.33% {
											x: 1px;
											y: 1px;
										}
									}
								</style><rect class="spinner_9y7u" x="1" y="1" rx="1" width="10" height="10" /><rect
									class="spinner_9y7u spinner_DF2s"
									x="1"
									y="1"
									rx="1"
									width="10"
									height="10"
								/><rect
									class="spinner_9y7u spinner_q27e"
									x="1"
									y="1"
									rx="1"
									width="10"
									height="10"
								/></svg
							>
						{/if}
					</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
