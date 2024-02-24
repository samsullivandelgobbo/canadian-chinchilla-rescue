<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const application = data.application;
</script>

{#if application}
	<div>
		<div class="px-4 sm:px-0">
			<h3 class="text-base font-semibold leading-7 text-gray-900">Applicant Information</h3>
			<p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
				Personal details and application.
			</p>
		</div>
		<div class="mt-6 border-t border-gray-100">
			<dl class="divide-y divide-gray-100">
				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm font-medium leading-6 text-gray-900">Full name</dt>
					<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{application?.firstName}
						{application?.lastName}
					</dd>
				</div>
				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm font-medium leading-6 text-gray-900">Email address</dt>
					<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{application?.email}
					</dd>
				</div>
				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm font-medium leading-6 text-gray-900">Age</dt>
					<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{application?.age}
					</dd>
				</div>

				{#if application?.parentFirstName || application?.parentEmail || application?.parentLastName}
					<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6 text-gray-900">Parent name</dt>
						<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{application?.parentFirstName}
							{application?.parentLastName}
						</dd>
					</div>

					<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6 text-gray-900">Parent email</dt>
						<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{application?.email}
						</dd>
					</div>
				{/if}

				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm font-medium leading-6 text-gray-900">Allergy issues</dt>
					<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{application?.hasAllergies ? 'Yes' : 'No'}
					</dd>
				</div>
				<dl class="divide-y divide-gray-100">
					<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6 text-gray-900">Has a chinchilla vet</dt>
						<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{application?.hasChinchillaVet ? 'Yes' : 'No'}
						</dd>
					</div>
				</dl>

				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm font-medium leading-6 text-gray-900">Has cage</dt>
					<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{application?.hasCage ? 'Yes' : 'No'}
					</dd>
				</div>

				{#if application?.cageType}
					<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6 text-gray-900">Cage type</dt>
						<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{application?.cageType}
						</dd>
					</div>
				{/if}

				{#if application?.cageImage}
					<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
						<dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
							<ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
								<li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
									<div class="flex w-0 flex-1 items-center">
										<svg
											class="h-5 w-5 flex-shrink-0 text-gray-400"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
												clip-rule="evenodd"
											/>
										</svg>
										<div class="ml-4 flex min-w-0 flex-1 gap-2">
											<span class="truncate font-medium">
												{application.cageImage}
											</span>
											<span class="flex-shrink-0 text-gray-400">2.4mb</span>
										</div>
									</div>
									<div class="ml-4 flex-shrink-0">
										<a
											href={application.cageImage}
											class="font-medium text-red-600 hover:text-red-500">Download</a
										>
									</div>
								</li>
							</ul>
						</dd>
					</div>
				{/if}

				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm font-medium leading-6 text-gray-900">Why a chinchilla</dt>
					<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{application?.whyChinchilla}
					</dd>
				</div>
			</dl>
		</div>

		<div class="px-4 sm:px-0">
			<h3 class="text-base font-semibold leading-7 text-gray-900">Applicant Household</h3>
			<p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
				Information about the applicant's household.
			</p>
		</div>
		<div class="mt-6 border-t border-gray-100">
			<dl class="divide-y divide-gray-100">
				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm font-medium leading-6 text-gray-900">Children in home</dt>
					<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{application?.hasChildren ? 'Yes' : 'No'}
					</dd>
				</div>

				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm font-medium leading-6 text-gray-900">Pets in home</dt>
					<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalizev">
						{application?.hasPets ? application?.petTypes.map((pet) => pet).join(', ') : 'No'}
					</dd>
				</div>
			</dl>
		</div>
		<div class="px-4 sm:px-0">
			<h3 class="text-base font-semibold leading-7 text-gray-900">Applicant Pet History</h3>
			<p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
				Information about the applicant's history with pets.
			</p>
		</div>
		<div class="mt-6 border-t border-gray-100">
			<dl class="divide-y divide-gray-100">
				<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm font-medium leading-6 text-gray-900">Has owned a chinchilla before</dt>
					<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
						{application?.ownedChinchillas ? 'Yes' : 'No'}
					</dd>
				</div>
				<dl class="divide-y divide-gray-100">
					<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt class="text-sm font-medium leading-6 text-gray-900">Surrendered a pet before</dt>
						<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalizev">
							{application?.surrenderedPet ? 'Yes' : 'No'}
						</dd>
					</div>

					{#if application?.surrenderedPet}
						<div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
							<dt class="text-sm font-medium leading-6 text-gray-900">Surrendered pet reason</dt>
							<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalizev">
								{application?.surrenderedPetReason}
							</dd>
						</div>
					{/if}
				</dl>
			</dl>
		</div>
	</div>
{/if}
