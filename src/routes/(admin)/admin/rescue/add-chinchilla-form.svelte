<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { formSchema, type FormSchema } from './schema';
	import type { SuperValidated } from 'sveltekit-superforms';
	export let form: SuperValidated<FormSchema>;
	import SelectItem from '$lib/components/ui/select/select-item.svelte';
	import Select from '$lib/components/ui/select/select.svelte';

	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';

	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import type { Chinchilla } from '@prisma/client';
	let gender: 'MALE' | 'FEMALE' = 'FEMALE';
	let open = false;
	let uploadedImages: string[] = [];

	let bondedWith: Chinchilla[] = [];
	export let chinchillas: Chinchilla[] = [];

	const chinchillaColors = [
		{ value: 'standard-gray', label: 'Standard Gray', gradient: 'from-gray-500 to-gray-900' },
		{ value: 'black-velvet', label: 'Black Velvet', gradient: 'from-gray-900 to-gray-900' },
		{ value: 'white', label: 'White', gradient: 'from-gray-50 to-gray-300' },
		{ value: 'beige', label: 'Beige', gradient: 'from-stone-100 to-stone-400' },
		{ value: 'ebony', label: 'Ebony', gradient: 'from-gray-900 to-gray-900' },
		{ value: 'violet', label: 'Violet', gradient: 'from-indigo-900 to-gray-800' },
		{
			value: 'sapphire',
			label: 'Sapphire',
			gradient: 'from-blue-800 to-indigo-900 via-[70%] via-gray-700'
		},
		{ value: 'mosaic', label: 'Mosaic', gradient: 'from-gray-100 to-gray-600 via-gray-200' },
		{ value: 'tan', label: 'Tan', gradient: 'from-stone-700 to-stone-800' }
	];

	$: uploadedImages;

	$: console.log(gender);
	async function handleFileInput(event) {
		console.log('event', event);
		const files = event.target.files;

		// read files
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const reader = new FileReader();

			// Wrap the onload in a promise
			const readPromise = new Promise((resolve, reject) => {
				reader.onload = (e) => {
					uploadedImages = [...uploadedImages, e.target.result];
					resolve(e.target.result);
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
	}

	function moveImageUp(index) {
		if (index > 0) {
			[uploadedImages[index - 1], uploadedImages[index]] = [
				uploadedImages[index],
				uploadedImages[index - 1]
			];
			uploadedImages = [...uploadedImages]; // reassign to trigger reactivity
		}
	}

	function moveImageDown(index) {
		if (index < uploadedImages.length - 1) {
			[uploadedImages[index], uploadedImages[index + 1]] = [
				uploadedImages[index + 1],
				uploadedImages[index]
			];
			uploadedImages = [...uploadedImages]; // reassign to trigger reactivity
		}
	}
</script>

<Form.Root
	method="POST"
	{form}
	enctype="multipart/form-data"
	schema={formSchema}
	let:config
	class=" "
>
	<!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-4"> -->

	<div class="max-h-[600px] px-4 overflow-y-scroll flex flex-col gap-4 md:grid grid-cols-2">
		<Form.Field {config} name="name">
			<Form.Item>
				<Form.Label>Name</Form.Label>
				<Form.Input />
				<Form.Description>Name of the chinchilla you want to add</Form.Description>
				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="age">
			<Form.Item>
				<Form.Label>Age</Form.Label>
				<Form.Input type="number" />
				<Form.Description>Age of the chinchilla you want to add</Form.Description>
				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="color">
			<Form.Item>
				<Form.Label>Color</Form.Label>
				<!-- <Form.Input /> -->
				<Form.Select>
					<Form.SelectTrigger placeholder="Select a chinchilla color" />
					<Form.SelectContent>
						{#each chinchillaColors as color}
							<SelectItem value={color.value} class="flex w-full justify-between">
								{color.label}
								<span class="w-4 h-4 rounded-full bg-gradient-to-br {color.gradient}" />
							</SelectItem>
						{/each}
					</Form.SelectContent>
				</Form.Select>

				<Form.Description>The color of the chinchilla you want to add</Form.Description>
				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="gender" let:setValue>
			<Form.Item>
				<div class="flex flex-col gap-4">
					<Form.Label>Gender</Form.Label>
					<Form.Input class="hidden" />
					<Form.Control let:attrs>
						<button
							{...attrs}
							type="button"
							on:click={() => {
								gender === 'MALE' ? (gender = 'FEMALE') : (gender = 'MALE');
								setValue(gender);
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
					</Form.Control>

					<Form.Description>The gender of the chinchilla you want to add</Form.Description>
					<Form.Validation />
				</div>
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="images">
			<Form.Item>
				<Form.Label>Images</Form.Label>
				<Form.Input
					type="file"
					multiple
					on:change={handleFileInput}
					accept="image/png, image/jpeg, image/jpg"
				/>
				<Form.Description>Images of the chinchilla you want to add</Form.Description>
				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="bondedWith" let:setValue let:value>
			<Form.Item class="flex w-full flex-col justify-between">
				<Form.Label class="mb-2">Bonded With</Form.Label>

				<Popover.Root let:ids>
					<Popover.Trigger asChild let:builder>
						<Form.Control id={ids.trigger} let:attrs>
							<Button
								builders={[builder]}
								{...attrs}
								variant="outline"
								role="combobox"
								type="button"
								class={cn(
									'min-w-[400px] md:max-w-[400px] justify-between overflow-hidden ',
									!value && 'text-muted-foreground'
								)}
							>
								{bondedWith.length > 0
									? bondedWith.map((chinchilla) => chinchilla.name).join(', ')
									: 'Select chinchillas'}
								<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</Form.Control>
					</Popover.Trigger>
					<Popover.Content class="max-w-[400px] min-w-[400px] p-0">
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
											// handlePetTypeSelect(chinchilla);
											// closeAndFocusTrigger(ids.trigger);
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
				<Form.Description>
					<!-- This is the petType that will be used in the dashboard. -->
				</Form.Description>
				<Form.Description>
					Select the chinchillas that this chinchilla is bonded with.
				</Form.Description>
				<Form.Validation />
			</Form.Item>
		</Form.Field>

		<Form.Field {config} name="friendly">
			<Form.Item class="flex flex-row w-full justify-between gap-3  ">
				<div class="flex flex-col gap-2">
					<Form.Label>Friendly</Form.Label>

					<Form.Description>Is the chinchilla friendly with other chinchillas?</Form.Description>
				</div>

				<Form.Switch />
			</Form.Item>
		</Form.Field>

		<!-- display uploaded images -->
		{#if uploadedImages.length > 0}
			<div class="flex flex-row gap-4">
				{#each uploadedImages as image, index}
					<div class="flex flex-col gap-4">
						<img
							src={image}
							alt={`Uploaded Image ${index}`}
							class="w-48 h-48 object-cover rounded-2xl"
						/>
						<button on:click={() => deleteImage(index)}>Delete</button>
						<button on:click={() => moveImageUp(index)}>Move Up</button>
						<button on:click={() => moveImageDown(index)}>Move Down</button>
					</div>
				{/each}
			</div>
		{/if}

		<div class=" col-span-2 w-full">
			<Form.Field {config} name="description">
				<Form.Item>
					<Form.Label>Description</Form.Label>
					<Form.Textarea />
					<Form.Description>Description of the chinchilla you want to add</Form.Description>
					<Form.Validation />
				</Form.Item>
			</Form.Field>
		</div>
		<!-- </div> -->
	</div>

	<Form.Button
		class="bg-gradient-to-br from-orange-400/50 to-pink-500 hover:from-red-200/80 hover:to-orange-500/80 
    transition transform-gpu 
    duration-500 ease-in-out text-white font-bold 
    
    flex w-full col-span-2"
	>
		Add Chinchilla
	</Form.Button>
</Form.Root>
