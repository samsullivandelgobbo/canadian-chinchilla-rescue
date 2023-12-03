<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import SelectItem from '$lib/components/ui/select/select-item.svelte';
	import Select from '$lib/components/ui/select/select.svelte';
	import { applicationSchema } from './schema';
	import type { FormSchema } from './schema';

	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import * as Command from '$lib/components/ui/command';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import { Check, ChevronsUpDown } from 'lucide-svelte';

	export let chinchillas: Chinchilla[];

	export let form: SuperValidated<FormSchema>;
	import { page } from '$app/stores';
	let hasChinchilla = false;

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
	let open = false;
	let gender: 'MALE' | 'FEMALE' = 'FEMALE';
	const petTypes = [
		{ value: 'dog', label: 'Dog' },
		{ value: 'cat', label: 'Cat' },
		{ value: 'rabbit', label: 'Rabbit' },
		{ value: 'bird', label: 'Bird' },
		{ value: 'reptile', label: 'Reptile' },
		{ value: 'other', label: 'Other' }
	];

	let selectedPetTypes: { value: string; label: string }[] = [];

	function handlePetTypeSelect(petType: { value: string; label: string }) {
		console.log('handlePetTypeSelect');
		if (selectedPetTypes.includes(petType)) {
			selectedPetTypes = selectedPetTypes.filter(
				(selectedPetType) => selectedPetType.value !== petType.value
			);
		} else {
			selectedPetTypes = [...selectedPetTypes, petType];
		}
	}
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
	<Form.Root
		method="POST"
		{form}
		schema={applicationSchema}
		let:config
		class="max-w-xl mx-auto mt-8"
	>
		<div class="grid grid-cols-2 gap-x-8 gap-y-6">
			<Form.Field name="firstName" {config}>
				<Form.Item>
					<Form.Label>First name</Form.Label>
					<Form.Input />

					<Form.Validation />
				</Form.Item>
			</Form.Field>

			<Form.Field name="lastName" {config}>
				<Form.Item>
					<Form.Label>Last name</Form.Label>
					<Form.Input />

					<Form.Validation />
				</Form.Item>
			</Form.Field>

			<Form.Field name="email" {config}>
				<Form.Item>
					<Form.Label>Email</Form.Label>
					<Form.Input />

					<Form.Validation />
				</Form.Item>
			</Form.Field>

			<Form.Field name="age" {config} let:value>
				<Form.Item>
					<Form.Label>Age</Form.Label>
					<Form.Input type="number" min="12" value="12" />

					<Form.Validation />
				</Form.Item>

				{#if value < 18 && value > 11}
					<div class="flex flex-col w-full col-span-2 justify-between">
						<p class="text-sm text-gray-500 mb-4">
							You must be at least 12 years old to adopt a chinchilla. If you are under 18, you will
							need a parent or guardian to fill out the form with you.
						</p>
						<Form.Field name="parentFirstName" {config}>
							<Form.Item class="w-full flex-col flex justify-between">
								<Form.Label>Parent's name</Form.Label>
								<Form.Input />
								<!-- <Form.Description>This is your public display name.</Form.Description> -->
								<Form.Validation />
							</Form.Item>
						</Form.Field>
					</div>
					<div class="flex w-full col-span-2 justify-between">
						<Form.Field name="parentLastName" {config}>
							<Form.Item class="w-full flex-col flex justify-between">
								<Form.Label>Parent's name</Form.Label>
								<Form.Input />
								<!-- <Form.Description>This is your public display name.</Form.Description> -->
								<Form.Validation />
							</Form.Item>
						</Form.Field>
					</div>
					<div class="flex w-full col-span-2 justify-between">
						<Form.Field name="parentEmail" {config}>
							<Form.Item class="w-full flex-col flex justify-between">
								<Form.Label>Parent's email</Form.Label>
								<Form.Input />
								<!-- <Form.Description>This is your public display name.</Form.Description> -->
								<Form.Validation />
							</Form.Item>
						</Form.Field>
					</div>
				{/if}
			</Form.Field>

			<div class="flex w-full col-span-2 justify-between">
				<Form.Field name="readCareGuide" {config}>
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>
								Have you read our <a href="/care" class="hover:underline text-red-500">
									care guide
								</a>?
							</Form.Label>
							<Form.Description>
								This outlines the requirements for adopting and caring for a chinchilla.
							</Form.Description>
							<Form.Validation />
						</div>

						<Form.Switch />
					</Form.Item>
				</Form.Field>
			</div>

			<Form.Field name="hasCage" {config} let:value>
				<div class="flex w-full col-span-2 justify-between">
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Do you have a cage?</Form.Label>
							<Form.Description>
								We require that you have a cage before adopting a chinchilla.
							</Form.Description>
							<Form.Validation />
						</div>

						<Form.Switch />
					</Form.Item>
				</div>

				{#if value}
					<Form.Field name="cageType" {config}>
						<div class="flex w-full flex-col md:flex-row col-span-2 justify-between">
							<Form.Item class="w-full flex-col md:flex-row flex justify-between">
								<div class="flex flex-col gap-2 w-full">
									<Form.Label>Cage Type</Form.Label>
									<Form.Description>What type of cage do you have?</Form.Description>
									<Form.Validation />
								</div>
								<Form.Select>
									<Form.SelectTrigger placeholder="Select cage model" />
									<Form.SelectContent>
										<Form.SelectItem value="Ferret / Critter Nation">
											Ferret / Critter Nation
										</Form.SelectItem>
										<Form.SelectItem value="Other">Other</Form.SelectItem>
									</Form.SelectContent>
								</Form.Select>
							</Form.Item>
						</div>
					</Form.Field>

					<Form.Field name="cageImages" {config}>
						<div class="flex md:flex-row flex-col w-full col-span-2 justify-between">
							<Form.Item class="w-full md:flex-row flex-col flex justify-between">
								<div class="flex flex-col gap-2 w-full">
									<Form.Label>Cage Image</Form.Label>
									<Form.Description>
										Please upload an image of your cage if possible.
									</Form.Description>
									<Form.Validation />
								</div>
								<Form.Input type="file" multiple accept="image/png, image/jpeg, image/jpg" />
							</Form.Item>
						</div>
					</Form.Field>
				{/if}
			</Form.Field>

			<div class="flex w-full col-span-2 justify-between">
				<Form.Field name="hasChildren" {config}>
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Do you have children in your home?</Form.Label>
							<Form.Description>
								Chinchillas are not recommended for homes with children under the age of 12.
							</Form.Description>
							<Form.Validation />
						</div>

						<Form.Switch />
					</Form.Item>
				</Form.Field>
			</div>

			<Form.Field name="hasPets" {config} let:value>
				<div class="flex w-full flex-col col-span-2 justify-between">
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Are there any other pets in your home?</Form.Label>
							<Form.Description>
								This includes pets owned by roommates or family members.
							</Form.Description>
							<Form.Validation />
						</div>

						<Form.Switch />
					</Form.Item>
				</div>

				{#if value}
					<div class="flex w-full col-span-2 justify-between">
						<Form.Field {config} name="petTypes" let:setValue let:value>
							<Form.Item class="flex w-full flex-col md:flex-row justify-between">
								<div class="flex flex-col gap-4 w-full">
									<Form.Label>What type of pets do you have?</Form.Label>
									<Form.Description>Please select all the pets in your home.</Form.Description>
								</div>

								<Popover.Root bind:open let:ids>
									<Popover.Trigger asChild let:builder>
										<Form.Control id={ids.trigger} let:attrs>
											<Button
												builders={[builder]}
												{...attrs}
												variant="outline"
												role="combobox"
												type="button"
												class={cn(
													'min-w-[200px] md:max-w-[200px] justify-between overflow-hidden',
													!value && 'text-muted-foreground'
												)}
											>
												{selectedPetTypes.length > 0
													? selectedPetTypes.map((petType) => petType.label).join(', ')
													: 'Select pet types...'}
												<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</Form.Control>
									</Popover.Trigger>
									<Popover.Content class="max-w-[200px] min-w-[200px] p-0">
										<Command.Root>
											<Command.Input autofocus placeholder="Search petType..." />
											<Command.Empty>No petType found.</Command.Empty>
											<Command.Group>
												{#each petTypes as petType}
													<Command.Item
														value={petType.value}
														onSelect={() => {
															console.log('on select firing');
															console.log(value);
															handlePetTypeSelect(petType);
															// closeAndFocusTrigger(ids.trigger);
														}}
													>
														<Check
															class={cn(
																'mr-2 h-4 w-4',
																selectedPetTypes.includes(petType)
																	? 'text-red-500'
																	: 'text-transparent'
															)}
														/>
														{petType.label}
													</Command.Item>
												{/each}
											</Command.Group>
										</Command.Root>
									</Popover.Content>
								</Popover.Root>
								<Form.Description>
									<!-- This is the petType that will be used in the dashboard. -->
								</Form.Description>
								<Form.Validation />
							</Form.Item>
						</Form.Field>
					</div>
				{/if}
			</Form.Field>

			<Form.Field name="surrenderedPets" {config} let:value>
				<div class="flex w-full col-span-2 justify-between">
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Have you ever surrendered a pet to a shelter or rescue?</Form.Label>
							<Form.Description>
								This is not a deal breaker, but we need to know the circumstances.
							</Form.Description>
						</div>

						<Form.Switch />

						<Form.Validation />
					</Form.Item>
				</div>

				{#if value}
					<Form.Field name="cageType" {config}>
						<div class="flex w-full col-span-2 justify-between">
							<Form.Item class="w-full flex justify-between">
								<div class="flex flex-col gap-2 w-full">
									<Form.Label>Pet Type</Form.Label>
									<Form.Description>What type of pet did you surrender?</Form.Description>
									<Form.Validation />
								</div>
								<Form.Select>
									<Form.SelectTrigger placeholder="Select pet type" />
									<Form.SelectContent>
										{#each petTypes as petType}
											<Form.SelectItem value={petType.value}>
												{petType.label}
											</Form.SelectItem>
										{/each}
									</Form.SelectContent>
								</Form.Select>
							</Form.Item>
						</div>
					</Form.Field>
					<Form.Field name="surrenderedPetReason" {config} class="w-full col-span-2">
						<div class="flex w-full col-span-2 justify-between">
							<Form.Item class="w-full flex justify-between">
								<div class="flex flex-col gap-2 w-full">
									<Form.Label>Reason for surrender</Form.Label>
									<Form.Description>
										Explain the circumstances that led to you surrendering your pet.
									</Form.Description>

									<Form.Textarea />
									<Form.Validation />
								</div></Form.Item
							>
						</div></Form.Field
					>
				{/if}
			</Form.Field>

			<div class="flex w-full col-span-2 justify-between">
				<Form.Field name="ownedChinchillas" {config}>
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Have you owned chinchillas before?</Form.Label>
							<Form.Description>
								Experience with chinchillas is not required, but we would like to know if you have
								had them before.
							</Form.Description>
						</div>

						<Form.Switch />

						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>

			<Form.Field name="hasChinchilla" {config} let:value={hasChinchilla}>
				<div class="flex w-full col-span-2 justify-between">
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Do you currently own a chinchilla?</Form.Label>
							<Form.Description>
								If you currently own a chinchilla, we need to take extra care to ensure that your
								new chinchilla will be compatible with your current chinchilla.
							</Form.Description>
						</div>

						<Form.Switch />

						<Form.Validation />
					</Form.Item>
				</div>

				{#if hasChinchilla}
					<Form.Field name="chinchillaNames" {config}>
						<Form.Item>
							<Form.Label>Chinchilla's name</Form.Label>
							<Form.Input />
							<!-- <Form.Description>This is your public display name.</Form.Description> -->
							<Form.Validation />
						</Form.Item>
					</Form.Field>

					<Form.Field name="ownedChinchillaAge" {config} let:value>
						<Form.Item>
							<Form.Label>Age</Form.Label>
							<Form.Input type="number" />

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

					<div class="flex w-full col-span-2 justify-between">
						<Form.Field name="willQuarantine" {config}>
							<Form.Item class="w-full flex justify-between">
								<div class="flex flex-col gap-2 w-full">
									<Form.Label>Quarantine</Form.Label>
									<Form.Description>
										I understand that I will need to quarantine my new chinchilla for at least 10
										days before introducing them to my current chinchilla.
									</Form.Description>
								</div>

								<Form.Checkbox
									class="h-7 w-7 items-center justify-center flex rounded border-gray-300 text-red-400 focus:ring-red-400"
								/>

								<Form.Validation />
							</Form.Item>
						</Form.Field>
					</div>
				{/if}
			</Form.Field>

			<div class="flex w-full col-span-2 justify-between">
				<Form.Field name="hasChinchillaVet" {config}>
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Do you have a chinchilla veternarian?</Form.Label>
							<Form.Description>
								We require you to have a vet that is experienced with chinchillas. If you do not
								have a vet, we can recommend one.
							</Form.Description>
							<Form.Validation />
						</div>

						<Form.Switch />
					</Form.Item>
				</Form.Field>
			</div>

			<!-- ack sections -->
			<!-- title -->
			<div class="flex flex-col w-full col-span-2">
				<h3 class="text-lg leading-6 font-medium text-gray-900 mt-6">Acknowledgements</h3>
				<p class="mt-2 text-sm text-gray-500">
					Please read and acknowledge the following statements. You must be able to agree and abide
					by all of the statements below to adopt a chinchilla.
				</p>
			</div>

			<div class="flex w-full col-span-2 justify-between">
				<Form.Field name="hasAirConditioning" {config}>
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Air Conditioning</Form.Label>
							<Form.Description>
								I have adequately air conditioned space in my home for the chinchilla. I am aware
								that chinchillas cannot tolerate temperatures above 75 degrees Fahrenheit (24
								degrees Celsius).
							</Form.Description>
						</div>

						<Form.Checkbox
							class="h-7 w-7 items-center justify-center flex rounded border-gray-300 text-red-400 focus:ring-red-400"
						/>

						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>

			<div class="flex w-full col-span-2 justify-between">
				<Form.Field name="financialResponsibility" {config}>
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Financial Responsibility</Form.Label>
							<Form.Description>
								I am able and willing to afford the costs of owning a chinchilla, including food,
								supplies, and veterinary care.
							</Form.Description>
						</div>

						<Form.Checkbox
							class="h-7 w-7 items-center justify-center flex rounded border-gray-300 text-red-400 focus:ring-red-400"
						/>

						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>
			<div class="flex w-full col-span-2 justify-between">
				<Form.Field name="timeResponsibility" {config}>
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Time Commitment</Form.Label>
							<Form.Description>
								I understand that chinchillas can live beyond 20 years and I am willing and able to
								make that commitment.
							</Form.Description>
						</div>

						<Form.Checkbox
							class="h-7 w-7 items-center justify-center flex rounded border-gray-300 text-red-400 focus:ring-red-400"
						/>

						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>
			<div class="flex w-full col-span-2 justify-between">
				<Form.Field name="hasSpace" {config}>
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Space Requirements</Form.Label>
							<Form.Description>
								I will be able to dedicate a room or area of my home to the chinchilla. This area
								will be free of other pets, direct sunlight, and will be safe for the chinchilla to
								play in.
							</Form.Description>
						</div>

						<Form.Checkbox
							class="h-7 w-7 items-center justify-center flex rounded border-gray-300 text-red-400 focus:ring-red-400"
						/>

						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>
			<div class="flex w-full col-span-2 justify-between">
				<Form.Field name="cleaningResponsibility" {config}>
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Cleaning Commitment</Form.Label>
							<Form.Description>
								I understand that chinchillas can be <strong>very</strong> messy, I will be able to clean
								up after my chinchilla daily and give them dust baths at least once a week.
							</Form.Description>
						</div>

						<Form.Checkbox
							class="h-7 w-7 items-center justify-center flex rounded border-gray-300 text-red-400 focus:ring-red-400"
						/>

						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>
			<div class="flex w-full col-span-2 justify-between">
				<Form.Field name="playtimeResponsibility" {config}>
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Playtime Commitment</Form.Label>
							<Form.Description>
								I understand that chinchillas require daily playtime outside of their cage. I will
								be able to provide at least 30 minutes of fun interaction with my chinchilla every
								day. (This can be broken up into multiple sessions throughout the day.)
							</Form.Description>
						</div>

						<Form.Checkbox
							class="h-7 w-7 items-center justify-center flex rounded border-gray-300 text-red-400 focus:ring-red-400"
						/>

						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>

			<div class="flex w-full col-span-2 justify-between">
				<Form.Field name="breedingAcknowledgement" {config}>
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Breeding Acknowledgement</Form.Label>
							<Form.Description>
								I understand that no rescue chinchilla is to ever be bred. I agree to never breed
								any chinchilla I adopt from the Canadian Chinchilla Rescue.
							</Form.Description>
						</div>

						<Form.Checkbox
							class="h-7 w-7 items-center justify-center flex rounded border-gray-300 text-red-400 focus:ring-red-400"
						/>

						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>

			<div class="flex w-full col-span-2 justify-between">
				<Form.Field name="handlingAcknowledgement" {config}>
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Handling Acknowledgement</Form.Label>
							<Form.Description>
								I understand that chinchillas are not cuddly pets. I agree to never force my
								chinchilla to be held or petted. I will respect my chinchilla's boundaries and only
								handle them when they are comfortable.
							</Form.Description>
						</div>

						<Form.Checkbox
							class="h-7 w-7 items-center justify-center flex rounded border-gray-300 text-red-400 focus:ring-red-400"
						/>

						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>

			<div class="flex w-full col-span-2 justify-between">
				<Form.Field name="factuallyAccurate" {config}>
					<Form.Item class="w-full flex justify-between">
						<div class="flex flex-col gap-2 w-full">
							<Form.Label>Factually Accurate</Form.Label>
							<Form.Description>
								I agree that all of the information I have provided is factually accurate. I
								understand that providing false information will result in my application being
								denied.
							</Form.Description>
						</div>

						<Form.Checkbox
							class="h-7 w-7 items-center justify-center flex rounded border-gray-300 text-red-400 focus:ring-red-400"
						/>

						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>

			<!-- <div class="flex w-full col-span-2 justify-between">
        <Form.Field name="hasCommitment" {config}> -->

			<Form.Button class="col-span-2 w-full mt-8">Submit Application</Form.Button>
		</div>
	</Form.Root>
</div>
