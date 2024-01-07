<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { mediaQuery } from 'svelte-legos';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import { Trash } from 'lucide-svelte';
	import PostCard from '$lib/components/PostCard.svelte';

	let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');
</script>

{#if $isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Trigger asChild let:builder>
			<Button variant="outline" builders={[builder]}>Preview</Button>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[100vw] w-full h-full max-h-screen">
			<Dialog.Header>
				<Dialog.Title class="text-center text-2xl">Preview</Dialog.Title>
				<Separator class="my-4" />
			</Dialog.Header>

			<!-- <div class="flex flex-row w-full items-center justify-between rounded-lg border p-4">
					<div class="space-y-0.5">
						<Label for="email">Email</Label>
					</div>
					<Switch />
				</div> -->

			<Dialog.Footer class="h-full  ">
				<div class="h-full flex flex-col justify-between items-baseline w-full">
					<div class="flex-1 h-full" />
					<Separator class="my-4" />

					<div class="flex flex-row gap-4 w-full justify-end items-baseline">
						<Button variant="outline" on:click={() => (open = false)}>Back</Button>
						<Button variant="default">Continue</Button>
					</div>
				</div>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger asChild let:builder>
			<Button variant="outline" builders={[builder]}>Preview</Button>
		</Drawer.Trigger>
		<Drawer.Content class="px-4">
			<Drawer.Header class="text-left">
				<Drawer.Title class="text-center text-2xl">Preview</Drawer.Title>
			</Drawer.Header>
			<!-- <PostCard/> -->

			<Drawer.Footer class="px-0">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]} on:click={() => (open = false)}
						>Back</Button
					>
					<Button variant="default" builders={[builder]}>Continue</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
