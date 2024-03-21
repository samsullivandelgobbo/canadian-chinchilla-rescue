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

	import { revalidate, useSWR } from 'sswr';
	import ChinchillaForm from './chinchilla-form.svelte';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import * as Card from '$lib/components/ui/card';

	import { Button } from '$lib/components/ui/button';

	import RescueChinCard from '$lib/components/RescueChinCard.svelte';

	import * as Dialog from '$lib/components/ui/dialog';

	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import type { FormSchema } from './schema';
	import { toast } from 'svelte-sonner';
	import { mediaQuery } from 'svelte-legos';

	import * as Drawer from '$lib/components/ui/drawer';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	export let chinchilla: any;

	export let formData: SuperValidated<Infer<FormSchema>>;

	const defaultValues = {
		id: chinchilla.id.toString(),
		name: chinchilla.name,
		age: chinchilla.age,
		gender: chinchilla.gender,
		bondedWith: chinchilla.bondedWith,
		color: chinchilla.color,
		friendly: chinchilla.friendly,
		description: chinchilla.description,
		photos: chinchilla.photos
	};

	async function handleDeleteChinchilla() {
		const res = await fetch(`/api/chinchilla/${chinchilla.id}`, {
			method: 'DELETE'
		});

		if (res.ok) {
			toast.success('Chinchilla deleted successfully');
		} else {
			toast.error('Failed to delete chinchilla');
		}
	}

	// is there a better way to do this?

	// this might be a better way to do it
	// let formData: SuperValidated<Infer<FormSchema>> = superForm<FormSchema>({

	// });

	// age: chinchilla.age,
	// gender: chinchilla.gender,
	// bondedWith: chinchilla.bondedWith,
	// friendly: chinchilla.friendly,
	// description: chinchilla.description,
	// color: chinchilla.color

	let isDeleteAlertDialogOpen = false;
	let isEditChinchillaDialogOpen = false;

	const isDesktop = mediaQuery('(min-width: 768px)');
</script>

<div class="relative">
	<div class="absolute top-0 right-0 m-2 rounded-full z-50" id={`dropdown-${chinchilla.id}`}>
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
							isEditChinchillaDialogOpen = true;
						}}
					>
						<Edit class="mr-2 h-4 w-4" />
						<span> Edit </span>
					</DropdownMenu.Item>

					<DropdownMenu.Item
						on:click={() => {
							console.log(chinchilla);
							isDeleteAlertDialogOpen = true;
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

	<RescueChinCard {chinchilla} disabled />
</div>

{#if $isDesktop}
	<Dialog.Root bind:open={isEditChinchillaDialogOpen}>
		<Dialog.Content class=" max-w-4xl  max-h-screen">
			<Dialog.Title class="text-center text-2xl">Edit Chinchilla</Dialog.Title>
			<Separator class="my-4" />

			<ChinchillaForm
				data={formData}
				{defaultValues}
				on:success={() => (isEditChinchillaDialogOpen = false)}
			/>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open={isEditChinchillaDialogOpen}>
		<Drawer.Content class="px-4">
			<Drawer.Header class="text-left">
				<Drawer.Title class="text-center text-2xl">Edit Chinchilla</Drawer.Title>
			</Drawer.Header>

			<ChinchillaForm
				data={formData}
				{defaultValues}
				on:success={() => (isEditChinchillaDialogOpen = false)}
			/>
		</Drawer.Content>
	</Drawer.Root>
{/if}

<Dialog.Root bind:open={isDeleteAlertDialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description>
				This will permanently delete {chinchilla.name} from the database. You can't undo this action.
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Button variant="outline" on:click={() => (isDeleteAlertDialogOpen = false)}>Cancel</Button>
			<Button
				variant="destructive"
				on:click={() => {
					handleDeleteChinchilla();
					isDeleteAlertDialogOpen = false;
				}}>Delete</Button
			>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
