<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import SelectItem from '$lib/components/ui/select/select-item.svelte';
	// import Select from '$lib/components/ui/select/select.svelte';
	import * as Select from '$lib/components/ui/select';
	import { applicationSchema } from './schema';
	import type { FormSchema } from './schema';

	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import { Switch } from '$lib/components/ui/switch';

	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import { ArrowRight, Check, ChevronsUpDown } from 'lucide-svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';

	import { page } from '$app/stores';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { Chinchilla } from '@prisma/client';
	import Sucess from './sucess.svelte';
	import Loading from './loading.svelte';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { browser } from '$app/environment';
	import { toast } from 'svelte-sonner';

	const provinces = [
		{ value: 'AB', label: 'Alberta' },
		{ value: 'BC', label: 'British Columbia' },
		{ value: 'MB', label: 'Manitoba' },
		{ value: 'NB', label: 'New Brunswick' },
		{ value: 'NL', label: 'Newfoundland and Labrador' },
		{ value: 'NS', label: 'Nova Scotia' },
		{ value: 'NT', label: 'Northwest Territories' },
		{ value: 'NU', label: 'Nunavut' },
		{ value: 'ON', label: 'Ontario' },
		{ value: 'PE', label: 'Prince Edward Island' },
		{ value: 'QC', label: 'Quebec' },
		{ value: 'SK', label: 'Saskatchewan' },
		{ value: 'YT', label: 'Yukon' }
	];

	let data: SuperValidated<Infer<FormSchema>>;
	export { data as form };

	const form = superForm(data, {
		validators: zodClient(applicationSchema),
		onUpdated: ({ form: f }) => {
			if (f.valid) {
				// toast.success("You submitted" + JSON.stringify(f.data, null, 2));
			} else {
				// toast.error("Please fix the errors in the form.");
			}
		}
	});

	$: if ($message) {
		console.log($message);

		if ($message.success) {
			toast.success('Your application has been submitted.', {
				duration: 60000,
				dismissable: true,
				position: 'top-center'
			});
		}

		if ($message.error) {
			toast.error('There was an error submitting your application.');
		}

		if ($message.warning) {
			toast.warning('Please fix the errors in the form.');
		}
	}

	const { form: formData, errors, message, enhance } = form;

	export let chinchillas: Chinchilla[];

	$formData.chinchillaGender = 'FEMALE';
</script>

<svelte:head>
	<!-- Seo -->
	<title>Adoption Application | Canadian Chinchilla Rescue</title>
	<meta
		name="description"
		content="We are excited that you are interested in adopting a chinchilla. Please fill out the form below to start the adoption process."
	/>
</svelte:head>

<div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
	<div class="mx-auto max-w-2xl text-center">
		<h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
			Adoption application
		</h2>
		<p class="mt-2 text-lg leading-8 text-gray-600">
			We are excited that you are interested in adopting a chinchilla. Please read our <a
				href="/care"
				class="hover:underline text-red-500">care page</a
			>
			before filling out the form below to start the adoption process. If you have any questions, don't
			hesitate to send us an
			<a href="mailto:canadianchinchillarescue@gmail.com" class="hover:underline text-red-500"
				>email</a
			>.
		</p>
	</div>

	<form
		method="POST"
		use:enhance
		class="max-w-xl mx-auto my-8"
		enctype="multipart/form-data"
		action="/adopt/application"
	>
		<div class="grid lg:grid-cols-2 gap-x-8 gap-y-6">
			<Form.Field {form} name="firstName">
				<Form.Control let:attrs>
					<Form.Label>First name</Form.Label>
					<Input {...attrs} bind:value={$formData.firstName} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="lastName">
				<Form.Control let:attrs>
					<Form.Label>First name</Form.Label>
					<Input {...attrs} bind:value={$formData.lastName} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="age">
				<Form.Control let:attrs>
					<Form.Label>Age</Form.Label>
					<Input {...attrs} bind:value={$formData.age} />
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="city">
				<Form.Control let:attrs>
					<Form.Label>City</Form.Label>
					<Input {...attrs} bind:value={$formData.city} />
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="province">
				<Form.Control let:attrs>
					<Form.Label>Province</Form.Label>
					<input name={attrs.name} value={$formData.province} hidden />

					<Select.Root
						portal={null}
						preventScroll={false}
						onSelectedChange={(s) => {
							if (s) {
								$formData.province = s.value;
							}
						}}
					>
						<Select.Trigger>
							<Select.Value placeholder="Province" />
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Provinces</Select.Label>
								{#each provinces as province}
									<Select.Item value={province.value} label={province.label}
										>{province.label}</Select.Item
									>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input name="favoriteFruit" />
					</Select.Root>
				</Form.Control>

				<Form.FieldErrors />
			</Form.Field>

			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field {form} name="readCareGuide" class="w-full flex justify-between">
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>
								Have you read our <a href="/care" class="hover:underline text-red-500">
									care guide
								</a>?
							</Form.Label>
							<Form.Description>
								This outlines the requirements for adopting and caring for a chinchilla.
							</Form.Description>
						</div>
						<input name={attrs.name} value={$formData.readCareGuide} hidden />
						<Switch {...attrs} bind:checked={$formData.readCareGuide} />
					</Form.Control>
				</Form.Field>
			</div>

			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field {form} name="hasCage" class="w-full flex justify-between">
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Do you have a cage?</Form.Label>
							<Form.Description>
								We require that you have a cage before adopting a chinchilla.
							</Form.Description>
						</div>
						<input name={attrs.name} value={$formData.hasCage} hidden />
						<Switch {...attrs} bind:checked={$formData.hasCage} />
					</Form.Control>
				</Form.Field>
			</div>
			{#if $formData.hasCage}
				<div class="flex w-full lg:col-span-2 justify-between">
					<Form.Field {form} name="cageType" class="flex w-full justify-between">
						<Form.Control let:attrs>
							<!-- <input type="hidden" bind:value={$formData.cageType} {...attrs} /> -->
							<div class="flex flex-col gap-2 w-full">
								<Form.Label>Cage Type</Form.Label>
								<Form.Description>What type of cage do you have?</Form.Description>
							</div>
							<input name={attrs.name} value={$formData.cageType} hidden />
							<Select.Root
								onSelectedChange={(s) => {
									if (s) {
										$formData.cageType = s.value;
									}
								}}
							>
								<Select.Trigger {...attrs}>
									<Select.Value placeholder="Select a cage type" />
								</Select.Trigger>
								<Select.Content>
									<Select.Input name={attrs.name} />
									<SelectItem value="Ferret / Critter Nation">Ferret / Critter Nation</SelectItem>
									<SelectItem value="Other">Other</SelectItem>
								</Select.Content>
							</Select.Root>
						</Form.Control>
					</Form.Field>
				</div>
				<div class="flex w-full lg:col-span-2 justify-between">
					<Form.Field {form} name="cageImage" class="w-full flex justify-between">
						<Form.Control let:attrs>
							<div class="flex flex-col gap-2 w-full">
								<Form.Label>Cage Image</Form.Label>
								<Form.Description>Please upload an image of your cage if possible.</Form.Description
								>
							</div>

							<Input {...attrs} type="file" accept="image/*" />
						</Form.Control>
					</Form.Field>
				</div>
			{/if}

			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field name="hasChildren" {form} class="w-full flex justify-between">
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Do you have children in your home?</Form.Label>
							<Form.Description>
								Chinchillas are not recommended for homes with children under the age of 12.
							</Form.Description>
						</div>
						<input name={attrs.name} value={$formData.hasChildren} hidden />
						<Switch {...attrs} bind:checked={$formData.hasChildren} />
					</Form.Control>
				</Form.Field>
			</div>

			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field name="hasPets" {form} class="w-full flex justify-between">
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Are there any other pets in your home?</Form.Label>
							<Form.Description>
								This includes pets owned by roommates or family members.
							</Form.Description>
						</div>
						<Switch {...attrs} bind:checked={$formData.hasPets} />

						<input name={attrs.name} value={$formData.hasPets} hidden />
					</Form.Control>
				</Form.Field>
			</div>

			{#if $formData.hasPets}
				<div class="flex w-full lg:col-span-2 justify-between">
					<Form.Field {form} name="petTypes" class="flex w-full justify-between">
						<Form.Control let:attrs>
							<div class="flex flex-col gap-2 w-full">
								<Form.Label>What type of pets do you have?</Form.Label>
								<Form.Description>Please select all the pets in your home.</Form.Description>
							</div>
							<Select.Root
								multiple
								{...attrs}
								onSelectedChange={(s) => {
									if (s) {
										// @ts-ignore
										$formData.petTypes = s.map((c) => c.value);
									} else {
										$formData.petTypes = [];
									}
								}}
							>
								{#if $formData.petTypes && $formData.petTypes.length > 0}
									{#each $formData.petTypes as pet}
										<input hidden name={attrs.name} value={pet} />
									{/each}
								{/if}

								<Select.Trigger {...attrs}>
									<Select.Value placeholder="Select a pet type" />
								</Select.Trigger>
								<Select.Content>
									<Select.Input name={attrs.name} placeholder="Search pets" />
									<SelectItem value="dog">Dog</SelectItem>
									<SelectItem value="cat">Cat</SelectItem>
									<SelectItem value="rabbit">Rabbit</SelectItem>
									<SelectItem value="bird">Bird</SelectItem>
									<SelectItem value="reptile">Reptile</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</Select.Content>
							</Select.Root>
						</Form.Control>
					</Form.Field>
				</div>
			{/if}
			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field name="hasAllergies" {form} class="w-full flex justify-between">
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Do you have any issues with allergies?</Form.Label>
							<Form.Description>
								This includes allergies to hay, dust, or other allergens.
							</Form.Description>
						</div>
						<input name={attrs.name} value={$formData.hasPets} hidden />
						<Switch {...attrs} bind:checked={$formData.hasAllergies} />
					</Form.Control>
				</Form.Field>
			</div>

			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field name="surrenderedPets" {form} class="w-full flex justify-between">
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Have you ever surrendered a pet to a shelter or rescue?</Form.Label>
							<Form.Description>
								This is not a deal breaker, but we need to know the circumstances.
							</Form.Description>
						</div>
						<input name={attrs.name} value={$formData.surrenderedPets} hidden />
						<Switch {...attrs} bind:checked={$formData.surrenderedPets} />
					</Form.Control>
				</Form.Field>
			</div>

			{#if $formData.surrenderedPets}
				<div class="flex w-full lg:col-span-2 justify-between">
					<Form.Field {form} name="surrenderedPetType" class="flex w-full justify-between">
						<Form.Control let:attrs>
							<div class="flex flex-col gap-2 w-full">
								<Form.Label>Pet Type</Form.Label>
								<Form.Description>What type of pet did you surrender?</Form.Description>
							</div>

							<Select.Root
								onSelectedChange={(s) => {
									if (s) {
										// @ts-ignore
										$formData.surrenderedPetType = s.value;
									}
								}}
							>
								<Select.Input name={attrs.name} />
								<Select.Trigger {...attrs}>
									<Select.Value placeholder="Select a pet type" />
								</Select.Trigger>
								<Select.Content>
									<SelectItem value="dog">Dog</SelectItem>
									<SelectItem value="cat">Cat</SelectItem>
									<SelectItem value="rabbit">Rabbit</SelectItem>
									<SelectItem value="bird">Bird</SelectItem>
									<SelectItem value="reptile">Reptile</SelectItem>
									<SelectItem value="other">Other</SelectItem>
								</Select.Content>
							</Select.Root>
						</Form.Control>
					</Form.Field>
				</div>

				<div class="flex w-full lg:col-span-2 justify-between">
					<Form.Field {form} name="surrenderedPetReason" class="w-full">
						<Form.Control let:attrs>
							<Form.Label>Reason for surrender</Form.Label>
							<Form.Description>
								Explain the circumstances that led to you surrendering your pet.
							</Form.Description>
							<Textarea bind:value={$formData.surrenderedPetReason} {...attrs} class="w-full" />
						</Form.Control>
					</Form.Field>
				</div>
			{/if}
			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field name="ownedChinchillas" {form} class="w-full flex justify-between">
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Have you owned chinchillas before?</Form.Label>
							<Form.Description>
								Experience with chinchillas is not required, but we would like to know if you have
								had them before.
							</Form.Description>
						</div>
						<input name={attrs.name} value={$formData.ownedChinchillas} hidden />
						<Switch {...attrs} bind:checked={$formData.ownedChinchillas} />
					</Form.Control>
				</Form.Field>
			</div>

			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field name="hasChinchilla" {form} class="w-full flex justify-between">
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Do you currently own a chinchilla?</Form.Label>
							<Form.Description>
								If you currently own a chinchilla, we need to take extra care to ensure that your
								new chinchilla will be compatible with your current chinchilla.
							</Form.Description>
							<Form.FieldErrors />
						</div>
						<Switch {...attrs} bind:checked={$formData.hasChinchilla} />

						<input name={attrs.name} value={$formData.hasChinchilla} hidden />
					</Form.Control>
				</Form.Field>
			</div>

			{#if $formData.hasChinchilla}
				<Form.Field {form} name="chinchillaName">
					<Form.Control let:attrs>
						<Form.Label>Chinchilla's name</Form.Label>
						<Input {...attrs} bind:value={$formData.chinchillaName} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<Form.Field {form} name="chinchillaAge">
					<Form.Control let:attrs>
						<Form.Label>Age</Form.Label>
						<Input {...attrs} bind:value={$formData.chinchillaAge} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>

				<Form.Field {form} name="chinchillaGender">
					<div class="flex flex-col gap-4">
						<Form.Control let:attrs>
							<input type="hidden" bind:value={$formData.chinchillaGender} name={attrs.name} />

							<Form.Label>Gender</Form.Label>
							<button
								type="button"
								on:click={() => {
									$formData.chinchillaGender === 'MALE'
										? ($formData.chinchillaGender = 'FEMALE')
										: ($formData.chinchillaGender = 'MALE');
								}}
								class="bg-gray-50 mt-1 relative inline-flex h-[36px] w-48 flex-shrink-0 cursor-pointer rounded-full border border-gray-10 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-gray-200"
								role="switch"
								aria-checked="false"
							>
								<span
									aria-hidden="true"
									class={cn(
										'pointer-events-none inline-flex h-[34px] w-24 transform rounded-full bg-gradient-to-r shadow ring-0 transition duration-200 ease-in-out items-center justify-center text-center',
										$formData.chinchillaGender === 'MALE'
											? 'translate-x-0 from-blue-200 to-blue-400'
											: 'translate-x-[94px] from-pink-200 to-pink-400'
									)}
								/>
								<div class="absolute left-0 px-6 ml-1 py-1">Male</div>

								<span
									aria-hidden="true"
									class="translate-x-0 pointer-events-none inline-flex h-[36px] w-24 transform ring-0 transition duration-200 ease-in-out items-center justify-center text-center"
									>Female</span
								>
							</button>
						</Form.Control>
					</div>
				</Form.Field>

				<Form.Field {form} name="willQuarantine" class="w-full flex justify-between">
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Quarantine</Form.Label>
							<Form.Description>
								I understand that I will need to quarantine my new chinchilla for at least 10 days
								before introducing them to my current chinchilla.
							</Form.Description>
						</div>
						<input name={attrs.name} value={$formData.willQuarantine} hidden />
						<Checkbox
							{...attrs}
							bind:checked={$formData.willQuarantine}
							class="h-8 w-8 items-center justify-center flex"
						/>
					</Form.Control>
				</Form.Field>
			{/if}

			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field name="hasChinchillaVet" {form} class="w-full flex justify-between">
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Do you have a chinchilla veternarian?</Form.Label>
							<Form.Description>
								We require you to have a vet that is experienced with chinchillas. If you do not
								have a vet, we can recommend one.
							</Form.Description>
						</div>
						<input name={attrs.name} value={$formData.hasChinchillaVet} hidden />
						<Switch {...attrs} bind:checked={$formData.hasChinchillaVet} />
					</Form.Control>
				</Form.Field>
			</div>

			<!-- {#if $formData.hasChinchillaVet}
      <Form.Field {form} name="vetName">
        <Form.Control let:attrs>
          <Form.Label>Vet's Name</Form.Label>
          <Input {...attrs} bind:value={$formData.vetName} />
          <Form.FieldErrors />
        </Form.Control>
      </Form.Field>
    {/if} -->

			<div class="flex w-full lg:col-span-2">
				<Form.Field name="whyChinchilla" {form} class="w-full">
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Why chinchilla?</Form.Label>
							<Form.Description>
								Briefly explain why you think a chinchilla is the right pet for you.
							</Form.Description>
							<Textarea {...attrs} bind:value={$formData.whyChinchilla} class="h-32 w-full" />
							<Form.FieldErrors />
						</div>
					</Form.Control>
				</Form.Field>
			</div>

			<div class="flex flex-col w-full lg:col-span-2">
				<h3 class="text-lg leading-6 font-medium text-gray-900 mt-6">Acknowledgements</h3>
				<p class="mt-2 text-sm text-gray-500">
					Please read and acknowledge the following statements. You must be able to agree and abide
					by all of the statements below to adopt a chinchilla.
				</p>
			</div>
			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field
					name="hasAirConditioning"
					{form}
					class="w-full flex justify-between items-center gap-2"
				>
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Air Conditioning</Form.Label>
							<Form.Description>
								I have adequately air conditioned space in my home for the chinchilla. I am aware
								that chinchillas cannot tolerate temperatures above 75 degrees Fahrenheit (24
								degrees Celsius).
							</Form.Description>
							<Form.FieldErrors />
						</div>
						<input name={attrs.name} value={$formData.hasAirConditioning} hidden />
						<Checkbox
							{...attrs}
							bind:checked={$formData.hasAirConditioning}
							class="h-8 w-8 items-center justify-center flex"
						/>
					</Form.Control>
				</Form.Field>
			</div>
			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field
					name="financialResponsibility"
					{form}
					class="w-full flex justify-between items-center gap-2"
				>
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Financial Responsibility</Form.Label>
							<Form.Description>
								I am able and willing to afford the costs of owning a chinchilla, including food,
								supplies, and veterinary care.
							</Form.Description>

							<Form.FieldErrors />
						</div>
						<input name={attrs.name} value={$formData.financialResponsibility} hidden />
						<Checkbox
							{...attrs}
							bind:checked={$formData.financialResponsibility}
							class="h-8 w-8 items-center justify-center flex"
						/>
					</Form.Control>
				</Form.Field>
			</div>
			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field
					name="timeResponsibility"
					{form}
					class="w-full flex justify-between items-center gap-2"
				>
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Time Commitment</Form.Label>
							<Form.Description>
								I understand that chinchillas can live beyond 20 years and I am willing and able to
								make that commitment.
							</Form.Description>

							<Form.FieldErrors />
						</div>
						<input name={attrs.name} value={$formData.timeResponsibility} hidden />
						<Checkbox
							{...attrs}
							bind:checked={$formData.timeResponsibility}
							class="h-8 w-8 items-center justify-center flex"
						/>
					</Form.Control>
				</Form.Field>
			</div>
			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field name="hasSpace" {form} class="w-full flex justify-between items-center gap-2">
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Space Requirements</Form.Label>
							<Form.Description>
								I will be able to dedicate a room or area of my home to the chinchilla. This area
								will be free of other pets, direct sunlight, and will be safe for the chinchilla to
								play in.
							</Form.Description>

							<Form.FieldErrors />
						</div>
						<input name={attrs.name} value={$formData.hasSpace} hidden />
						<Checkbox
							{...attrs}
							bind:checked={$formData.hasSpace}
							class="h-8 w-8 items-center justify-center flex"
						/>
					</Form.Control>
				</Form.Field>
			</div>

			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field name="cleaningResponsibility" {form} class="w-full flex justify-between">
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Cleaning Commitment</Form.Label>
							<Form.Description>
								I understand that chinchillas can be <strong>very</strong> messy, I will be able to clean
								up after my chinchilla daily and give them dust baths at least once a week.
							</Form.Description>

							<Form.FieldErrors />
						</div>
						<input name={attrs.name} value={$formData.cleaningResponsibility} hidden />
						<Checkbox
							{...attrs}
							bind:checked={$formData.cleaningResponsibility}
							class="h-8 w-8 items-center justify-center flex"
						/>
					</Form.Control>
				</Form.Field>
			</div>
			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field
					name="playtimeResponsibility"
					{form}
					class="w-full flex justify-between items-center gap-2"
				>
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Playtime Commitment</Form.Label>
							<Form.Description>
								I understand that chinchillas require daily playtime outside of their cage. I will
								be able to provide at least 30 minutes of fun interaction with my chinchilla every
								day. (This can be broken up into multiple sessions throughout the day.)
							</Form.Description>

							<Form.FieldErrors />
						</div>
						<input name={attrs.name} value={$formData.playtimeResponsibility} hidden />
						<Checkbox
							{...attrs}
							bind:checked={$formData.playtimeResponsibility}
							class="h-8 w-8 items-center justify-center flex"
						/>
					</Form.Control>
				</Form.Field>
			</div>
			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field
					name="breedingAcknowledgement"
					{form}
					class="w-full flex justify-between items-center gap-2"
				>
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Breeding Acknowledgement</Form.Label>
							<Form.Description>
								I understand that no rescue chinchilla is to ever be bred. I agree to never breed
								any chinchilla I adopt from the Canadian Chinchilla Rescue.
							</Form.Description>

							<Form.FieldErrors />
						</div>
						<input name={attrs.name} value={$formData.breedingAcknowledgement} hidden />
						<Checkbox
							{...attrs}
							bind:checked={$formData.breedingAcknowledgement}
							class="h-8 w-8 items-center justify-center flex"
						/>
					</Form.Control>
				</Form.Field>
			</div>

			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field
					name="handlingAcknowledgement"
					{form}
					class="w-full flex justify-between items-center gap-2"
				>
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Handling Acknowledgement</Form.Label>
							<Form.Description>
								I understand that chinchillas are not cuddly pets. I agree to never force my
								chinchilla to be held or petted. I will respect my chinchilla's boundaries and only
								handle them when they are comfortable.
							</Form.Description>
							<Form.FieldErrors />
						</div>
						<input name={attrs.name} value={$formData.handlingAcknowledgement} hidden />
						<Checkbox
							{...attrs}
							bind:checked={$formData.handlingAcknowledgement}
							class="h-8 w-8 items-center justify-center flex"
						/>
					</Form.Control>
				</Form.Field>
			</div>

			<div class="flex w-full lg:col-span-2 justify-between">
				<Form.Field
					name="factuallyAccurate"
					{form}
					class="w-full flex justify-between items-center gap-2"
				>
					<Form.Control let:attrs>
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Factually Accurate</Form.Label>
							<Form.Description>
								I agree that all of the information I have provided is factually accurate. I
								understand that providing false information will result in my application being
								denied.
							</Form.Description>

							<Form.FieldErrors />
						</div>
						<input name={attrs.name} value={$formData.factuallyAccurate} hidden />
						<Checkbox
							{...attrs}
							bind:checked={$formData.factuallyAccurate}
							class="h-8 w-8 items-center justify-center flex"
						/>
					</Form.Control>
				</Form.Field>
			</div>

			<!-- {#if browser}
				<div class="col-span-2">
					<SuperDebug data={$formData} />
				</div>
			{/if} -->

			<!-- <div class="flex w-full lg:col-span-2 justify-between">
        <Form.Field name="hasCommitment" {config}> -->

			<Form.Button class="lg:col-span-2 w-full mt-8 gap-2 inline-flex"
				>Submit Application

				<!-- <Loading /> -->
			</Form.Button>
		</div>
	</form>
</div>
