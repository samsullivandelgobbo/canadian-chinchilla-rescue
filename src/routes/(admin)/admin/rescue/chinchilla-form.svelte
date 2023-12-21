<script lang="ts">
	import Switch from '$lib/components/ui/switch/switch.svelte';

	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import { createEventDispatcher } from 'svelte';
	import { cn } from '$lib/utils';
	import { onDestroy, tick } from 'svelte';
	import { ArrowLeft, ArrowRight, Check, ChevronsUpDown, Trash } from 'lucide-svelte';
	import type { Chinchilla } from '@prisma/client';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	let gender: 'MALE' | 'FEMALE' = 'MALE';
	let open = false;
	let uploadedImages: any[] = [];
	let displayedImages: any[] = [];
	let bondedWith: Chinchilla[] = [];
	let photos;

	let isLoading = false;

	let name: string = '';
	let age: number = 1;
	let color: string = '';

	let description: string = '';
	let friendly: boolean = false;

	export let chinchillas: Chinchilla[] = [];
	export let editChinchilla: Chinchilla | null = null;

	const dispatch = createEventDispatcher();

	$: {
		if (editChinchilla) {
			name = editChinchilla.name;
			age = editChinchilla.age;
			color = editChinchilla.color;
			gender = editChinchilla.gender;
			description = editChinchilla.description;
			friendly = editChinchilla.friendly;
			displayedImages = editChinchilla.photos;
		}
	}

	const chinchillaColors = [
		{ value: 'Standard Gray', gradient: 'from-gray-500 to-gray-900' },
		{ value: 'Black Velvet', gradient: 'from-gray-900 to-gray-900' },
		{ value: 'White', gradient: 'from-gray-50 to-gray-300' },
		{ value: 'Beige', gradient: 'from-stone-100 to-stone-400' },
		{ value: 'Ebony', gradient: 'from-gray-900 to-gray-900' },
		{ value: 'Violet', gradient: 'from-red-900 to-gray-800' },
		{ value: 'Sapphire', gradient: 'from-blue-800 to-red-900 via-[70%] via-gray-700' },
		{ value: 'Mosaic', gradient: 'from-gray-100 to-gray-600 via-gray-200' },
		{ value: 'Tan', gradient: 'from-stone-700 to-stone-800' }
	];

	async function handleFileInput(event) {
		console.log('event', event);
		const files = event.target.files;
		console.log('files', files);
		photos = files;
		console.log('photos', photos);

		// read files
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			console.log(files);
			const reader = new FileReader();

			// Wrap the onload in a promise
			const readPromise = new Promise((resolve, reject) => {
				reader.onload = (e) => {
					uploadedImages = [...uploadedImages, e.target?.result];
					displayedImages = [...displayedImages, e.target?.result];
					resolve(e.target?.result);
				};

				reader.onerror = reject;
			});

			reader.readAsDataURL(file);

			// Wait for the file to be read
			await readPromise;
			console.log('uploadedImages', uploadedImages);
		}
	}

	function deleteImage(index) {
		uploadedImages = uploadedImages.filter((_, i) => i !== index);
		displayedImages = displayedImages.filter((_, i) => i !== index);
	}

	function moveImageUp(index) {
		if (index > 0) {
			[uploadedImages[index - 1], uploadedImages[index]] = [
				uploadedImages[index],
				uploadedImages[index - 1]
			];
			uploadedImages = [...uploadedImages]; // reassign to trigger reactivity

			[displayedImages[index - 1], displayedImages[index]] = [
				displayedImages[index],
				displayedImages[index - 1]
			];
			displayedImages = [...displayedImages]; // reassign to trigger reactivity
		}
	}

	function moveImageDown(index) {
		if (index < uploadedImages.length - 1) {
			[uploadedImages[index], uploadedImages[index + 1]] = [
				uploadedImages[index + 1],
				uploadedImages[index]
			];
			uploadedImages = [...uploadedImages]; // reassign to trigger reactivity

			[displayedImages[index], displayedImages[index + 1]] = [
				displayedImages[index + 1],
				displayedImages[index]
			];

			displayedImages = [...displayedImages]; // reassign to trigger reactivity
		}
	}

	async function createChinchilla() {
		isLoading = true;
		const res = await fetch(`/api/chinchilla`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				age: age,
				gender: gender,
				color: color,
				photos: uploadedImages,
				description: description,
				friendly: friendly,
				files: photos
			})
		});

		if (res.ok) {
			dispatch('success');
		} else {
			console.log('error');
			console.log(res.json());
		}
		isLoading = false;
	}

	async function updateChinchilla() {
		if (!editChinchilla) return;
		isLoading = true;
		const res = await fetch(`/api/chinchilla/${editChinchilla.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				age: age,
				gender: gender,
				color: color,
				photos: uploadedImages,
				description: description,
				friendly: friendly
			})
		});

		if (res.ok) {
			dispatch('success');
		} else {
			console.log('error');
			console.log(res.json());
		}
		isLoading = false;
	}
</script>

<div
	class="sm:max-h-[600px] max-h-[80vh] w-full px-4 py-8 overflow-y-scroll flex flex-col gap-x-12 gap-y-8 md:grid grid-cols-2"
>
	<div class="flex flex-col gap-2">
		<Label>Name</Label>

		<Input bind:value={name} />

		<p class="text-sm text-muted-foreground">Name of the chinchilla you want to add</p>
	</div>
	<div class="flex flex-col gap-2">
		<Label>Age</Label>
		<Input type="number" />

		<p class="text-sm text-muted-foreground">Age of the chinchilla you want to add</p>
	</div>
	<div class="flex flex-col gap-2">
		<Label>Color</Label>

		<Select.Root>
			<Select.Trigger>
				<Select.Value placeholder="Color" />
			</Select.Trigger>

			<Select.Content>
				{#each chinchillaColors as c}
					<Select.Item
						value={c.value}
						class="flex w-full justify-between"
						on:click={() => {
							color = c.value;
						}}
					>
						{c.value}
						<span class="w-4 h-4 rounded-full bg-gradient-to-br {c.gradient}" />
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>

		<p class="text-sm text-muted-foreground">The color of the chinchilla you want to add</p>
	</div>

	<div class="flex flex-col gap-2">
		<Label>Gender</Label>

		<button
			type="button"
			on:click={() => {
				gender === 'MALE' ? (gender = 'FEMALE') : (gender = 'MALE');
			}}
			class="bg-gray-50 mt-1 relative inline-flex h-[36px] w-48 flex-shrink-0 cursor-pointer rounded-full border border-gray-10 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-gray-200"
			role="switch"
			aria-checked="false"
		>
			<span
				aria-hidden="true"
				class="
        {gender === 'MALE'
					? 'translate-x-0 from-blue-200 to-blue-400'
					: 'translate-x-[94px] from-pink-200 to-pink-400 '}
        pointer-events-none inline-flex h-[34px] w-24 transform rounded-full bg-gradient-to-r shadow ring-0 transition duration-200 ease-in-out items-center justify-center text-center"
			/>
			<div class="absolute left-0 px-6 ml-1 py-1">Male</div>

			<span
				aria-hidden="true"
				class="translate-x-0 pointer-events-none inline-flex h-[36px] w-24 transform ring-0 transition duration-200 ease-in-out items-center justify-center text-center"
				>Female</span
			>
		</button>

		<p class="text-sm text-muted-foreground">The gender of the chinchilla you want to add</p>
	</div>

	<div class="flex flex-row w-full justify-between gap-2 items-center">
		<div class="flex flex-col gap-2">
			<Label>Friendly</Label>

			<p class="text-sm text-muted-foreground">
				Can this chinchilla be placed with other chinchillas?
			</p>
		</div>

		<Switch bind:checked={friendly} />
	</div>

	<div class="flex w-full flex-col justify-between">
		<Label class="mb-2">Bonded With</Label>

		<Popover.Root let:ids>
			<Popover.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="outline"
					role="combobox"
					type="button"
					class={cn('md:w-full justify-between overflow-hidden ')}
				>
					{bondedWith.length > 0
						? bondedWith.map((chinchilla) => chinchilla.name).join(', ')
						: 'Select chinchillas'}
					<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</Popover.Trigger>
			<Popover.Content class="max-w-[400px] w-full p-0">
				<Command.Root>
					<Command.Input autofocus placeholder="Search chichillas..." />
					<Command.Empty>No chinchillas found.</Command.Empty>
					<Command.Group>
						{#each chinchillas as chinchilla}
							<Command.Item
								value={chinchilla.id.toString()}
								onSelect={() => {
									console.log('on select firing');

									if (bondedWith.includes(chinchilla)) {
										bondedWith = bondedWith.filter((chin) => chin.id !== chinchilla.id);
									} else {
										bondedWith = [...bondedWith, chinchilla];
									}
									// setValue to {id: number}[]
								}}
							>
								<Check
									class="
											mr-2 h-4 w-4
                    {bondedWith.includes(chinchilla) ? 'text-blue-500' : 'text-transparent'}"
								/>
								{chinchilla.name}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>

		<p class="text-sm text-muted-foreground">
			Select the chinchillas that this chinchilla is bonded with.
		</p>
	</div>

	<!-- display uploaded images -->

	<div class=" col-span-2 w-full">
		<!-- how do we call setvalue inside the markdown -->

		<Label>Description</Label>

		<Textarea bind:value={description} />

		<p class="text-sm text-muted-foreground">Description of the chinchilla you want to add</p>
	</div>
	<div class="col-span-2 w-full">
		<label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Images</label
		>
		<div class="col-span-full justify-start flex w-full">
			<div class="grid grid-cols-4 gap-4 items-center justify-center">
				{#if displayedImages.length > 0}
					{#each displayedImages as image, index}
						<div class="flex flex-col gap-4">
							<img
								src={image}
								alt={`Uploaded Image ${index}`}
								class="w-48 h-48 object-cover rounded-2xl"
							/>
							<div class="flex flex-row gap-4 w-full justify-center">
								<Button variant="outline" size="icon" on:click={() => moveImageUp(index)}>
									<ArrowLeft class="h-4 w-4" />
								</Button>
								<Button variant="outline" size="icon" on:click={() => deleteImage(index)}>
									<Trash class="h-4 w-4" />
								</Button>
								<Button variant="outline" size="icon" on:click={() => moveImageDown(index)}>
									<ArrowRight class="h-4 w-4" />
								</Button>
							</div>
						</div>
					{/each}
				{/if}
				<button
					class="flex justify-start h-full"
					on:click={() => {
						document.getElementById('file-upload')?.click();
					}}
				>
					<div
						class=" flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6"
					>
						<div class="text-center">
							<img src="/logo.png" alt="logo" class="mx-auto h-12 w-12 text-gray-400" />
							<div class="mt-4 flex text-sm leading-6 text-gray-600">
								<label
									for="file-upload"
									class="relative text-center justify-center w-full cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
								>
									Upload a file
									<input
										multiple
										accept="image/*"
										id="file-upload"
										name="file-upload"
										type="file"
										class="sr-only"
										on:change={handleFileInput}
									/>
								</label>
							</div>
							<p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
						</div>
					</div>
				</button>
			</div>
		</div>
	</div>
</div>

<Button
	on:click={() => {
		editChinchilla ? updateChinchilla() : createChinchilla();
	}}
	class="bg-gradient-to-br from-orange-400/50 to-pink-500 hover:from-red-200/80 hover:to-orange-500/80 
    transition transform-gpu items-center justify-center
    duration-500 ease-in-out text-white font-bold gap-2 stroke-white fill-white 
    
    flex w-full col-span-2"
>
	{#if editChinchilla}
		Update Chinchilla
	{:else}
		Add Chinchilla
	{/if}
	{#if isLoading}
		<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
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
			/><rect class="spinner_9y7u spinner_q27e" x="1" y="1" rx="1" width="10" height="10" /></svg
		>
	{/if}
</Button>
