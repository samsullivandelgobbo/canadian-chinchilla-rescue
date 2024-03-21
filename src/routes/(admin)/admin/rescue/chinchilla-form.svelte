<script lang="ts">
	import Switch from '$lib/components/ui/switch/switch.svelte';

	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import { createEventDispatcher, onMount } from 'svelte';
	import { browser } from '$app/environment';

	import { cn } from '$lib/utils';
	import { onDestroy, tick } from 'svelte';
	import {
		ArrowLeft,
		ArrowRight,
		Check,
		ChevronsUpDown,
		Landmark,
		Mountain,
		MountainSnow,
		Trash
	} from 'lucide-svelte';
	import type { Chinchilla } from '@prisma/client';

	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	import SuperDebug, { type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { superForm, arrayProxy } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<FormSchema>>;
	import { formSchema, type FormSchema } from './schema';

	export let defaultValues: any;

	$: if (defaultValues) {
		$formData.name = defaultValues.name;
		$formData.age = defaultValues.age;
		$formData.color = defaultValues.color;
		$formData.friendly = defaultValues.friendly;
		$formData.id = defaultValues.id;
		$formData.gender = defaultValues.gender;
		$formData.description = defaultValues.description;
		displayedImage = defaultValues.photos;

		// $formData.bondedWith = defaultValues.bondedWith;
	}

	const dispatch = createEventDispatcher();

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance, errors, submitting, message } = form;

	let displayedImage: any;

	// const { path, values, errors: imageErrors } = arrayProxy(form, 'images');

	export let chinchillas: Chinchilla[] = [];

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
		const files = event.target.files;
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();
			const readPromise = new Promise((resolve, reject) => {
				reader.onload = (e) => {
					displayedImage = e.target?.result;
					resolve(e.target?.result);
				};
				reader.onerror = reject;
			});
			reader.readAsDataURL(file);
			await readPromise;
		}
	}

	function deleteImage() {
		$formData.image = undefined;
	}

	$: selectedColor = $formData.color
		? {
				label: $formData.color,
				value: $formData.color
		  }
		: undefined;

	onDestroy(() => {
		// console.log('destroyed');
		// form.reset();
	});

	$: if ($message && $message.success) {
		dispatch('success');
	}
</script>

<form method="POST" use:enhance enctype="multipart/form-data" action="/admin/rescue">
	<div
		class="sm:max-h-[60vh] max-h-[80vh] h-full w-full px-4 pb-8 overflow-y-scroll flex flex-col gap-x-12 gap-y-8 md:grid grid-cols-2"
	>
		<input type="hidden" name="id" bind:value={$formData.id} />
		<Form.Field {form} name="name">
			<Form.Control let:attrs>
				<Form.Label>Name</Form.Label>
				<Input {...attrs} bind:value={$formData.name} />
			</Form.Control>
			<Form.Description>Name of the chinchilla you want to add</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="age">
			<Form.Control let:attrs>
				<Form.Label>Age</Form.Label>
				<Input {...attrs} bind:value={$formData.age} />
			</Form.Control>
			<Form.Description>Age of the chinchilla you want to add</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="color">
			<Form.Control let:attrs>
				<Form.Label>Color</Form.Label>

				<Select.Root
					selected={selectedColor}
					onSelectedChange={(v) => {
						v && ($formData.color = v.value);
					}}
				>
					<Select.Trigger {...attrs}>
						{#if selectedColor && selectedColor.value}
							<span class="flex w-full justify-between text-start">
								{selectedColor?.label}
								<span
									class="w-4 h-4 mr-4 rounded-full bg-gradient-to-br {chinchillaColors?.find(
										(c) => c.value === selectedColor?.value
									).gradient}"
								/>
							</span>
						{:else}
							<span class="flex w-full justify-between text-start"> Select color </span>
						{/if}
					</Select.Trigger>

					<Select.Content>
						{#each chinchillaColors as c}
							<Select.Item value={c.value} class="flex w-full justify-between">
								{c.value}
								<span class="w-4 h-4 rounded-full bg-gradient-to-br {c.gradient}" />
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
				<input hidden bind:value={$formData.color} name={attrs.name} />
			</Form.Control>
			<Form.Description>The color of the chinchilla you want to add</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="gender" class="flex flex-col gap-2">
			<Form.Control let:attrs>
				<Form.Label>Gender</Form.Label>

				<button
					type="button"
					on:click={() => {
						$formData.gender === 'MALE'
							? ($formData.gender = 'FEMALE')
							: ($formData.gender = 'MALE');
					}}
					class="bg-gray-50 mt-1 relative inline-flex h-[36px] w-48 flex-shrink-0 cursor-pointer rounded-full border border-gray-10 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-gray-200"
					role="switch"
					aria-checked="false"
				>
					<span
						aria-hidden="true"
						class="
      {$formData.gender === 'MALE'
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
				<input hidden bind:value={$formData.gender} name={attrs.name} />
			</Form.Control>
			<Form.Description>The gender of the chinchilla you want to add</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field
			name="friendly"
			{form}
			class="flex flex-row items-center justify-between rounded-lg border p-4"
		>
			<Form.Control let:attrs>
				<div class="space-y-0.5">
					<Form.Label>Friendly</Form.Label>
					<Form.Description>Can this chinchilla be placed with other chinchillas?</Form.Description>
				</div>
				<input hidden bind:value={$formData.friendly} name={attrs.name} />
				<Switch {...attrs} includeInput bind:checked={$formData.friendly} />
			</Form.Control>
		</Form.Field>

		<Form.Field {form} name="bondedWith">
			<Form.Control let:attrs>
				<Form.Label>Bonded With</Form.Label>
				<Select.Root
					multiple
					onSelectedChange={(s) => {
						if (s) {
							$formData.bondedWith = s.map((c) => c.value);
						} else {
							$formData.bondedWith = [];
						}
					}}
				>
					{#each $formData.bondedWith as b}
						<input name={attrs.name} hidden value={b} />
					{/each}
					<Select.Trigger {...attrs}>
						<Select.Value placeholder="Select chinchillas" />
					</Select.Trigger>
					<Select.Content class="max-h-36 overflow-scroll">
						{#each chinchillas as chin}
							<Select.Item value={chin.name} label={chin.name} />
						{/each}
					</Select.Content>
				</Select.Root>
			</Form.Control>
			<Form.Description
				>Select the chinchillas that this chinchilla is bonded with.</Form.Description
			>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="description" class="col-span-2">
			<Form.Control let:attrs>
				<Form.Label>Description</Form.Label>
				<Textarea {...attrs} bind:value={$formData.description} />
			</Form.Control>
			<Form.Description>Description of the chinchilla you want to add</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<div class="col-span-2 w-full">
			<label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900"
				>Image</label
			>
			<div class="col-span-full justify-start flex w-full">
				<div class="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center justify-center">
					<button
						type="button"
						class="flex justify-start h-full"
						on:click={() => {
							document.getElementById('image')?.click();
						}}
					>
						{#if displayedImage}
							<img
								src={displayedImage}
								alt={`Uploaded Image `}
								class="w-48 h-48 object-cover rounded-2xl"
							/>
						{:else}
							<div
								class=" flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-6"
							>
								<div class="text-center justify-center flex flex-col items-center">
									<MountainSnow class="h-10 w-10 text-gray-900/50" />
									<div class="mt-4 flex text-sm leading-6 text-gray-600">
										<label
											for="file-upload"
											class="relative text-center justify-center w-full cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
										>
											Upload a file
										</label>
									</div>
									<p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
								</div>
							</div>
						{/if}
						<input
							accept="image/*"
							id="image"
							name="image"
							type="file"
							class="sr-only"
							on:input={(e) => ($formData.image = e.currentTarget.files?.item(0))}
							on:change={handleFileInput}
						/>
					</button>

					<!-- {#if $errors.images}<span>
							{JSON.stringify($errors.images)}
						</span>{/if}
					{#if displayedImages.length > 0}
						{#each displayedImages as image, index}
							<div class="flex flex-col gap-4">
							
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
					{/if} -->
				</div>
			</div>
		</div>
	</div>
	<!-- {#if browser}
		<div class="max-w-96 max-h-40 overflow-scroll">
			<SuperDebug data={$formData} />
		</div>
	{/if} -->
	<Form.Button
		type="submit"
		class="bg-gradient-to-br from-orange-400/50 to-pink-500 hover:from-red-200/80 hover:to-orange-500/80 
  transition transform-gpu items-center justify-center
  duration-500 ease-in-out text-white font-bold gap-2 stroke-white fill-white 
  mb-4
  flex w-full col-span-2"
	>
		{#if $formData.id}
			Update Chinchilla
		{:else}
			Add Chinchilla
		{/if}
		{#if $submitting}
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
	</Form.Button>
</form>
