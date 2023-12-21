<script lang="ts" context="module">
	export const ssr = false;

	import type { Load } from '@sveltejs/kit';

	const url = '/api/chinchilla';

	export const load: Load = async ({ fetch }) => {
		const response = await fetch('http://locahost:5175/api/chinchilla', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log('res', response);
		const initialChinchillas = await response.json();

		return {
			props: {
				initialChinchillas
			}
		};
	};
</script>

<script lang="ts">
	import {
		Activity,
		Archive,
		CreditCard,
		Edit,
		Eye,
		MoreHorizontal,
		Plus,
		Users
	} from 'lucide-svelte';

	import { useSWR } from 'sswr';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import * as Card from '$lib/components/ui/card';

	import type { PageData } from './$types';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	import ChinchillaForm from './chinchilla-form.svelte';
	import RescueChinCard from '$lib/components/RescueChinCard.svelte';
	import type { Chinchilla } from '@prisma/client';
	import { onMount } from 'svelte';

	let open = false;
	let edit = false;
	let dropdownOpen = false;
	let deleteAlertOpen = false;
	let notification = null;
	onMount(() => {
		console.log('mounted');
	});

	$: if (notification) {
		setTimeout(() => {
			notification = null;
		}, 5000);
	}

	export let initialChinchillas: Chinchilla[];

	const { data: chinchillas, revalidate } = useSWR<Chinchilla[]>('/api/chinchilla', {
		initialChinchillas,
		revalidateOnStart: true
	});

	let editChinchilla: Chinchilla;

	let selectedChinchilla: Chinchilla | null = null;

	const maleChinchillas = $chinchillas?.filter((chinchilla) => chinchilla.gender === 'MALE');

	const femaleChinchillas = $chinchillas?.filter((chinchilla) => chinchilla.gender === 'FEMALE');

	console.log(maleChinchillas);

	let selectedChinchillas: Chinchilla[] = [];

	async function handleChinchillaDelete(chinchillaId: number) {
		const res = await fetch(`/api/chinchilla/${chinchillaId}`, {
			method: 'DELETE'
		});

		if (res.ok) {
			console.log('deleted');
			revalidate();
			notification = {
				type: 'success',
				message: 'Successfully deleted chinchilla.'
			};
		}
	}
</script>

{#if notification}
	<!-- Global notification live region, render this permanently at the end of the document -->
	<div
		aria-live="assertive"
		class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
	>
		<div class="flex w-full flex-col items-center space-y-4 sm:items-end">
			<!--
      Notification panel, dynamically insert this into the live region when it needs to be displayed

      Entering: "transform ease-out duration-300 transition"
        From: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        To: "translate-y-0 opacity-100 sm:translate-x-0"
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
			<div
				class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
			>
				<div class="p-4">
					<div class="flex items-start">
						<div class="flex-shrink-0">
							<svg
								class="h-6 w-6 text-green-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div class="ml-3 w-0 flex-1 pt-0.5">
							<p class="text-sm font-medium text-gray-900">
								{notification.message}
							</p>
						</div>
						<div class="ml-4 flex flex-shrink-0">
							<button
								type="button"
								class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span class="sr-only">Close</span>
								<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
									<path
										d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<div class="bg-white mx-auto max-w-7xl lg:px-24 py-20">
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Current Chinchillas</Card.Title>
				<img src="/logo.png" alt="Logo" class="h-8 w-auto" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">
					{$chinchillas && $chinchillas.length ? $chinchillas.length : 0}
				</div>
				<div class="flex flex-row justify-between">
					<p class="text-xs text-muted-foreground">
						{#if maleChinchillas && maleChinchillas.length > 0}
							{maleChinchillas.length} male
						{/if}
					</p>

					<p class="text-xs text-muted-foreground">
						{#if femaleChinchillas && femaleChinchillas.length > 0}
							{femaleChinchillas.length} female
						{/if}
					</p>
				</div>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">New Subscriptions</Card.Title>
				<Users class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">23</div>
				<p class="text-xs text-green-500">+180.1% from last month</p>
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Adoption Applications</Card.Title>
				<CreditCard class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">12</div>
				<p class="text-xs text-muted-foreground">+19% from last month</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
				<Card.Title class="text-sm font-medium">Active Now</Card.Title>
				<Activity class="h-4 w-4 text-muted-foreground" />
			</Card.Header>
			<Card.Content>
				<div class="text-2xl font-bold">+573</div>
				<p class="text-xs text-muted-foreground">+201 since last hour</p>
			</Card.Content>
		</Card.Root>
	</div>
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7 pt-4">
		<Card.Root class="col-span-7">
			<Card.Header>
				<div class="flex w-full justify-between">
					<Card.Title>Overview</Card.Title>

					<Dialog.Root bind:open>
						<Dialog.Trigger
							class={buttonVariants({ variant: 'outline' })}
							on:click={() => {
								edit = false;

								setTimeout(() => {
									edit = true;
								}, 100);

								editChinchilla = null;
							}}
						>
							Add Chin <Plus class="ml-2 h-4 w-4" />
						</Dialog.Trigger>
						<Dialog.Content class=" max-w-4xl">
							<Dialog.Header>
								<Dialog.Title>Add Chinchilla</Dialog.Title>
								<Dialog.Description>
									Please fill out the form below to add a new chinchilla.
								</Dialog.Description>
							</Dialog.Header>
							<div class="flex flex-col px-4">
								{#if editChinchilla}
									<ChinchillaForm
										chinchillas={$chinchillas}
										{editChinchilla}
										on:success={() => {
											open = false;
											revalidate();
											notification = {
												type: 'success',
												message: 'Successfully edited chinchilla.'
											};
										}}
									/>
								{:else}
									<ChinchillaForm
										chinchillas={$chinchillas}
										editChinchilla={null}
										on:success={() => {
											open = false;
											revalidate();
											notification = {
												type: 'success',
												message: 'Successfully added chinchilla.'
											};
										}}
									/>
								{/if}
							</div>
						</Dialog.Content>
					</Dialog.Root>
				</div>
			</Card.Header>
			{#if $chinchillas}
				<Card.Content>
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{#each $chinchillas as chinchilla}
							<div class="border hover:border-red-300 rounded-2xl overflow-hidden relative">
								<!-- {#if selectedChinchillas.includes(chinchilla)}
								<div class="absolute top-0 right-0 m-2 rounded-full p-1 bg-red-400">
									<Check class="h-4 w-4 text-white" />
								</div>
							{/if} -->
								<div
									class="absolute top-0 right-0 m-2 rounded-full z-50"
									id={`dropdown-${chinchilla.id}`}
								>
									<DropdownMenu.Root preventScroll={false}>
										<DropdownMenu.Trigger asChild let:builder>
											<Button builders={[builder]} variant="outline" size="icon">
												<MoreHorizontal class="h-4 w-4 text-gray-700" />
											</Button>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content class="w-56">
											<DropdownMenu.Label>
												{chinchilla.name}
											</DropdownMenu.Label>
											<DropdownMenu.Separator />
											<DropdownMenu.Group>
												<DropdownMenu.Item>
													<Eye class="mr-2 h-4 w-4" />
													<span> View </span>
												</DropdownMenu.Item>
												<DropdownMenu.Item
													on:click={() => {
														editChinchilla = chinchilla;

														open = true;
													}}
												>
													<Edit class="mr-2 h-4 w-4" />
													<span> Edit </span>
												</DropdownMenu.Item>

												<DropdownMenu.Item
													on:click={() => {
														console.log(chinchilla);
														selectedChinchilla = chinchilla;
														deleteAlertOpen = true;
													}}
													class="text-red-500 hover:bg-red-100"
												>
													<Archive class="mr-2 h-4 w-4" />

													<span> Delete </span>
												</DropdownMenu.Item>
											</DropdownMenu.Group>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								</div>

								<RescueChinCard {chinchilla} />
							</div>
						{/each}
					</div>

					<!-- <Overview /> -->
				</Card.Content>
			{/if}
		</Card.Root>
	</div>
</div>

<AlertDialog.Root bind:open={deleteAlertOpen}>
	<AlertDialog.Trigger asChild />
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete
				{selectedChinchilla?.name} from the database.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				on:click={() => {
					handleChinchillaDelete(selectedChinchilla?.id);
				}}
				>Delete
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
