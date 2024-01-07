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

	import { Skeleton } from '$lib/components/ui/skeleton';

	import { useSWR } from 'sswr';
	import { toast } from 'svelte-sonner';

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

	import * as Drawer from '$lib/components/ui/drawer';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	import { mediaQuery } from 'svelte-legos';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { Trash } from 'lucide-svelte';
	import PostCard from '$lib/components/PostCard.svelte';

	const isDesktop = mediaQuery('(min-width: 768px)');

	let open = false;
	let edit = false;
	let dropdownOpen = false;
	let deleteAlertOpen = false;

	const {
		data: chinchillas,
		revalidate,
		isLoading
	} = useSWR<Chinchilla[]>('/api/chinchilla', {
		revalidateOnStart: true
	});

	let editChinchilla: Chinchilla;

	let selectedChinchilla: Chinchilla | null = null;

	let maleChinchillas: Chinchilla[] = [];
	let femaleChinchillas: Chinchilla[] = [];

	// calculate num of male chinchillas
	chinchillas.subscribe((value) => {
		if (!value) return;
		maleChinchillas = value?.filter((chinchilla) => {
			return chinchilla.gender === 'MALE';
		});

		femaleChinchillas = value?.filter((chinchilla) => {
			return chinchilla.gender === 'FEMALE';
		});
	});

	async function undoChinchillaDelete() {}

	async function handleChinchillaDelete(chinchillaId: number) {
		const res = await fetch(`/api/chinchilla/${chinchillaId}`, {
			method: 'DELETE'
		});

		if (res.ok) {
			console.log('deleted');
			revalidate();
			toast.success('Chinchilla archived successfully');
		}
	}
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Current Chinchillas</Card.Title>
			<!-- <img src="/logo.png" alt="Logo" class="h-8 w-auto" /> -->
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">
				{$chinchillas && $chinchillas.length ? $chinchillas.length : 0}
			</div>
			<div class="flex flex-row justify-between">
				<p class="text-xs text-muted-foreground" />

				<p class="text-xs text-muted-foreground" />
			</div>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Male Chinchillas</Card.Title>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="h-4 w-4 text-muted-foreground"
				><path
					d="M15.0491 8.53666L18.5858 5H14V3H22V11H20V6.41421L16.4633 9.95088C17.4274 11.2127 18 12.7895 18 14.5C18 18.6421 14.6421 22 10.5 22C6.35786 22 3 18.6421 3 14.5C3 10.3579 6.35786 7 10.5 7C12.2105 7 13.7873 7.57264 15.0491 8.53666ZM10.5 20C13.5376 20 16 17.5376 16 14.5C16 11.4624 13.5376 9 10.5 9C7.46243 9 5 11.4624 5 14.5C5 17.5376 7.46243 20 10.5 20Z"
					fill="currentColor"
				/></svg
			>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">
				{maleChinchillas.length}
			</div>
			<p class="text-xs text-green-500" />
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Female Chinchillas</Card.Title>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="h-4 w-4 text-muted-foreground"
				><path
					d="M11 15.9339C7.33064 15.445 4.5 12.3031 4.5 8.5C4.5 4.35786 7.85786 1 12 1C16.1421 1 19.5 4.35786 19.5 8.5C19.5 12.3031 16.6694 15.445 13 15.9339V18H18V20H13V24H11V20H6V18H11V15.9339ZM12 14C15.0376 14 17.5 11.5376 17.5 8.5C17.5 5.46243 15.0376 3 12 3C8.96243 3 6.5 5.46243 6.5 8.5C6.5 11.5376 8.96243 14 12 14Z"
					fill="currentColor"
				/></svg
			>
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">
				{femaleChinchillas.length}
			</div>
			<p class="text-xs text-muted-foreground" />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Adoptions This Month</Card.Title>
			<Activity class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">0</div>
			<p class="text-xs text-muted-foreground" />
		</Card.Content>
	</Card.Root>
</div>
<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7 pt-4">
	<Card.Root class="col-span-7">
		<Card.Header>
			<div class="flex w-full justify-between">
				<Card.Title>Overview</Card.Title>

				{#if $isDesktop}
					<Dialog.Root bind:open>
						<Dialog.Trigger asChild let:builder>
							<Button variant="outline" builders={[builder]}>
								Add Chinchilla <Plus class="h-4 w-4 ml-2" />
							</Button>
						</Dialog.Trigger>

						<Dialog.Content class=" max-w-4xl  max-h-screen">
							<Dialog.Title class="text-center text-2xl">
								{editChinchilla ? 'Update Chinchilla' : 'Add Chinchilla'}
							</Dialog.Title>
							<Separator class="my-4" />

							<div class="flex flex-col px-4">
								{#if editChinchilla}
									<ChinchillaForm
										chinchillas={$chinchillas}
										{editChinchilla}
										on:success={() => {
											open = false;
											revalidate();
											toast.success('Chinchilla successfully updated');
										}}
									/>
								{:else}
									<ChinchillaForm
										chinchillas={$chinchillas}
										editChinchilla={null}
										on:success={() => {
											open = false;
											revalidate();
											toast.success('Chinchilla added successfully');
										}}
									/>
								{/if}
							</div>
						</Dialog.Content>
					</Dialog.Root>
				{:else}
					<Drawer.Root bind:open>
						<Drawer.Trigger asChild let:builder>
							<Button variant="outline" builders={[builder]}>
								Add Chinchilla <Plus class="h-4 w-4 ml-2" />
							</Button>
						</Drawer.Trigger>
						<Drawer.Content class="px-4">
							<Drawer.Header class="text-left">
								<Drawer.Title class="text-center text-2xl">
									{editChinchilla ? 'Update Chinchilla' : 'Add Chinchilla'}
								</Drawer.Title>
							</Drawer.Header>

							<div class="flex flex-col px-4">
								{#if editChinchilla}
									<ChinchillaForm
										chinchillas={$chinchillas}
										{editChinchilla}
										on:success={() => {
											open = false;
											revalidate();
											toast.success('Chinchilla successfully updated');
										}}
									/>
								{:else}
									<ChinchillaForm
										chinchillas={$chinchillas}
										editChinchilla={null}
										on:success={() => {
											open = false;
											revalidate();
											toast.success('Chinchilla added successfully');
										}}
									/>
								{/if}
							</div>
						</Drawer.Content>
					</Drawer.Root>
				{/if}
			</div>
		</Card.Header>

		{#if $isLoading}
			<div class="flex items-center space-x-4 px-8 py-8">
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					<div class="space-y-2">
						<Skeleton class="h-[200px] w-[250px]" />
						<Skeleton class="h-4 w-[200px]" />
					</div>
					<div class="space-y-2">
						<Skeleton class="h-[200px] w-[250px]" />
						<Skeleton class="h-4 w-[200px]" />
					</div>
					<div class="space-y-2">
						<Skeleton class="h-[200px] w-[250px]" />
						<Skeleton class="h-4 w-[200px]" />
					</div>
				</div>
			</div>
		{/if}
		{#if $chinchillas && !$isLoading}
			<Card.Content>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{#each $chinchillas as chinchilla}
						<div class=" overflow-hidden relative">
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
