<script lang="ts">
	let age: number;
	let hasChildren: boolean;
	let hasCage: boolean;
	let readCareGuide: boolean;
	let otherPets: boolean;
	let ownedChinchilla: boolean;
	let surrenderedBefore: boolean;
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
			> before filling out the form below to start the adoption process.
		</p>
	</div>
	<form action="#" method="POST" class="mx-auto mt-16 max-w-xl sm:mt-20">
		<div class="grid grid-cols-2 gap-x-8 gap-y-6">
			<div>
				<label for="first-name" class="block text-sm font-semibold leading-6 text-gray-900"
					>First name</label
				>
				<div class="mt-2.5">
					<input
						type="text"
						name="first-name"
						id="first-name"
						autocomplete="given-name"
						class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>
			<div>
				<label for="last-name" class="block text-sm font-semibold leading-6 text-gray-900"
					>Last name</label
				>
				<div class="mt-2.5">
					<input
						type="text"
						name="last-name"
						id="last-name"
						autocomplete="family-name"
						class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>

			<div>
				<label for="email" class="block text-sm font-semibold leading-6 text-gray-900">Email</label>
				<div class="mt-2.5">
					<input
						type="email"
						name="email"
						id="email"
						autocomplete="email"
						class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>
			<div>
				<label for="age" class="block text-sm font-semibold leading-6 text-gray-900">Age</label>
				<div class="relative mt-2.5">
					<input
						type="number"
						name="age"
						min="12"
						bind:value={age}
						id="age"
						class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>
			<div class="flex items-center justify-between col-span-2">
				<span class="flex flex-grow flex-col">
					<span class="text-sm font-medium leading-6 text-gray-900" id="availability-label">
						Have you read our <a href="/care" class="hover:underline text-red-500">care guide</a>?
					</span>
					<span class="text-sm text-gray-500" id="availability-description">
						This outlines the requirements for adopting and caring for a chinchilla.
					</span>
				</span>
				<!-- Enabled: "bg-red-400", Not Enabled: "bg-gray-200" -->
				<button
					on:click={() => (readCareGuide = !readCareGuide)}
					type="button"
					class="
          {readCareGuide ? 'bg-red-400' : 'bg-gray-200'}
          bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
					role="switch"
				>
					<!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
					<span
						class="
            {readCareGuide ? 'translate-x-5' : 'translate-x-0'}
            translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
					/>
				</button>
			</div>
			<div class="flex items-center justify-between col-span-2">
				<span class="flex flex-grow flex-col">
					<span class="text-sm font-medium leading-6 text-gray-900" id="availability-label">
						Do you have a cage?
					</span>
					<span class="text-sm text-gray-500" id="availability-description">
						We require that you have a cage before adopting a chinchilla.
					</span>
				</span>
				<!-- Enabled: "bg-red-400", Not Enabled: "bg-gray-200" -->
				<button
					on:click={() => (hasCage = !hasCage)}
					type="button"
					class="
          {hasCage ? 'bg-red-400' : 'bg-gray-200'}
          bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
				>
					<!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
					<span
						class="
            {hasCage ? 'translate-x-5' : 'translate-x-0'}
            translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
					/>
				</button>
			</div>

			<div class="flex items-center justify-between col-span-2">
				<span class="flex flex-grow flex-col">
					<span class="text-sm font-medium leading-6 text-gray-900" id="availability-label">
						Do you have children in your home?
					</span>
					<span class="text-sm text-gray-500" id="availability-description">
						Chinchillas are not recommended for homes with children under the age of 12.
					</span>
				</span>

				<button
					on:click={() => (hasChildren = !hasChildren)}
					type="button"
					class="
          {hasChildren ? 'bg-red-400' : 'bg-gray-200'}
          bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
					role="switch"
					aria-checked="false"
				>
					<span
						aria-hidden="true"
						class="
            {hasChildren ? 'translate-x-5' : 'translate-x-0'}
            translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
					/>
				</button>
			</div>
			<div class="flex items-center justify-between col-span-2">
				<span class="flex flex-grow flex-col">
					<span class="text-sm font-medium leading-6 text-gray-900" id="availability-label">
						Are there any other pets in your home?
					</span>
					<span class="text-sm text-gray-500" id="availability-description">
						This includes pets owned by roommates or family members.
					</span>
				</span>

				<button
					on:click={() => (otherPets = !otherPets)}
					type="button"
					class="
          {otherPets ? 'bg-red-400' : 'bg-gray-200'}
          bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
					role="switch"
				>
					<span
						aria-hidden="true"
						class="
            {otherPets ? 'translate-x-5' : 'translate-x-0'}
            translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
					/>
				</button>
			</div>
			<div class="flex items-center justify-between col-span-2">
				<span class="flex flex-grow flex-col">
					<span class="text-sm font-medium leading-6 text-gray-900" id="availability-label">
						Have you ever owned a chinchilla before?
					</span>
				</span>
				<!-- Enabled: "bg-red-400", Not Enabled: "bg-gray-200" -->
				<button
					on:click={() => (ownedChinchilla = !ownedChinchilla)}
					type="button"
					class="
          {ownedChinchilla ? 'bg-red-400' : 'bg-gray-200'}
          bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
					role="switch"
					aria-checked="false"
				>
					<!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
					<span
						aria-hidden="true"
						class="
            {ownedChinchilla ? 'translate-x-5' : 'translate-x-0'}
            translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
					/>
				</button>
			</div>
			<div class="flex items-center justify-between col-span-2">
				<span class="flex flex-grow flex-col">
					<span class="text-sm font-medium leading-6 text-gray-900" id="availability-label">
						Have you ever surrendered a pet before?
					</span>
				</span>
				<!-- Enabled: "bg-red-400", Not Enabled: "bg-gray-200" -->
				<button
					on:click={() => (surrenderedBefore = !surrenderedBefore)}
					type="button"
					class="
          {surrenderedBefore ? 'bg-red-400' : 'bg-gray-200'}
          bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
					role="switch"
					aria-checked="false"
					aria-labelledby="availability-label"
					aria-describedby="availability-description"
				>
					<!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
					<span
						aria-hidden="true"
						class="
            {surrenderedBefore ? 'translate-x-5' : 'translate-x-0'}
            translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
					/>
				</button>
			</div>

			{#if surrenderedBefore}
				<div class="sm:col-span-2">
					<label for="message" class="block text-sm font-semibold leading-6 text-gray-900">
						Could you please explain why you surrendered your pet?
					</label>
					<div class="mt-2.5">
						<textarea
							name="message"
							id="message"
							rows="4"
							class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
			{/if}

			{#if age < 18}
				For parents
			{/if}

			<fieldset class="border-b border-t border-gray-200 sm:col-span-2">
				<legend class="sr-only">Notifications</legend>
				<div class="divide-y divide-gray-200">
					<div class="relative flex items-start pb-4 pt-3.5">
						<div class="min-w-0 flex-1 text-sm leading-6">
							<label for="commitment" class="font-medium text-gray-900"> Commitment </label>
							<p class="text-gray-500">
								I understand that chinchillas can live beyond 20 years and I am willing and able to
								make that commitment.
							</p>
						</div>
						<div class="ml-3 flex h-6 items-center">
							<input
								required
								id="commitment"
								name="commitment"
								type="checkbox"
								class="h-6 w-6 rounded border-gray-300 text-red-400 focus:ring-red-400"
							/>
						</div>
					</div>
					<div class="relative flex items-start pb-4 pt-3.5">
						<div class="min-w-0 flex-1 text-sm leading-6">
							<label for="playtime" class="font-medium text-gray-900"> Playtime </label>
							<p class="text-gray-500">
								I understand that chinchillas require daily playtime outside of their cage.
							</p>
						</div>
						<div class="ml-3 flex h-6 items-center">
							<input
								id="playtime"
								name="playtime"
								type="checkbox"
								class="h-6 w-6 rounded border-gray-300 text-red-400 focus:ring-red-400"
							/>
						</div>
					</div>
					<div class="relative flex items-start pb-4 pt-3.5">
						<div class="min-w-0 flex-1 text-sm leading-6">
							<label for="offers" class="font-medium text-gray-900"> Cleaning </label>
							<p id="offers-description" class="text-gray-500">
								I understand that chinchillas require daily cage cleaning and weekly dust baths.
							</p>
						</div>
						<div class="ml-3 flex h-6 items-center">
							<input
								id="offers"
								aria-describedby="offers-description"
								name="offers"
								type="checkbox"
								class="h-6 w-6 rounded border-gray-300 text-red-400 focus:ring-red-400"
							/>
						</div>
					</div>
					<div class="relative flex items-start pb-4 pt-3.5">
						<div class="min-w-0 flex-1 text-sm leading-6">
							<label for="offers" class="font-medium text-gray-900"> Supplies </label>
							<p id="offers-description" class="text-gray-500">
								I understand that chinchillas require uncommon items, many of which are not
								available at local pet stores.
							</p>
						</div>
						<div class="ml-3 flex h-6 items-center">
							<input
								id="offers"
								aria-describedby="offers-description"
								name="offers"
								type="checkbox"
								class="h-6 w-6 rounded border-gray-300 text-red-400 focus:ring-red-400"
							/>
						</div>
					</div>
					<div class="relative flex items-start pb-4 pt-3.5">
						<div class="min-w-0 flex-1 text-sm leading-6">
							<label for="offers" class="font-medium text-gray-900"> Healthcare </label>
							<p id="offers-description" class="text-gray-500">
								I currently know a veterinarian who is experienced with chinchillas or am willing to
								find one.
							</p>
						</div>
						<div class="ml-3 flex h-6 items-center">
							<input
								id="offers"
								aria-describedby="offers-description"
								name="offers"
								type="checkbox"
								class="h-6 w-6 rounded border-gray-300 text-red-400 focus:ring-red-400"
							/>
						</div>
					</div>
					<div class="relative flex items-start pb-4 pt-3.5">
						<div class="min-w-0 flex-1 text-sm leading-6">
							<label for="offers" class="font-medium text-gray-900"> Financial </label>
							<p id="offers-description" class="text-gray-500">
								I am able to afford the costs of owning a chinchilla, including food, supplies, and
								veterinary care.
							</p>
						</div>
						<div class="ml-3 flex h-6 items-center">
							<input
								id="offers"
								aria-describedby="offers-description"
								name="offers"
								type="checkbox"
								class="h-6 w-6 rounded border-gray-300 text-red-400 focus:ring-red-400"
							/>
						</div>
					</div>
					<div class="relative flex items-start pb-4 pt-3.5">
						<div class="min-w-0 flex-1 text-sm leading-6">
							<label for="offers" class="font-medium text-gray-900"> Air conditioning </label>
							<p id="offers-description" class="text-gray-500">
								I have adequately air conditioned space in my home for the chinchilla. I am aware
								that chinchillas cannot tolerate temperatures above 75 degrees Fahrenheit.
							</p>
						</div>
						<div class="ml-3 flex h-6 items-center">
							<input
								id="offers"
								aria-describedby="offers-description"
								name="offers"
								type="checkbox"
								class="h-6 w-6 rounded border-gray-300 text-red-400 focus:ring-red-400"
							/>
						</div>
					</div>
					<div class="relative flex items-start pb-4 pt-3.5">
						<div class="min-w-0 flex-1 text-sm leading-6">
							<label for="offers" class="font-medium text-gray-900"> I agree and understand </label>
							<p id="offers-description" class="text-gray-500">
								All of the above statements are true and I agree to abide by them. I understand that
								providing false information will result in my application being denied.
							</p>
						</div>
						<div class="ml-3 flex h-6 items-center">
							<input
								id="offers"
								aria-describedby="offers-description"
								name="offers"
								type="checkbox"
								class="h-6 w-6 rounded border-gray-300 text-red-400 focus:ring-red-400"
							/>
						</div>
					</div>
				</div>
			</fieldset>

			<div class="sm:col-span-2">
				<label for="whyAdoptChinchilla" class="block text-sm font-semibold leading-6 text-gray-900">
					Why do you think a chinchilla is the right pet for you?
				</label>
				<div class="mt-2.5">
					<textarea
						name="whyAdoptChinchilla"
						id="whyAdoptChinchilla"
						rows="4"
						class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
					/>
				</div>
			</div>
		</div>
		<div class="mt-10">
			<button
				type="submit"
				class="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
			>
				Submit
			</button>
		</div>
	</form>
</div>
