

<script lang="ts">
	import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { tick } from 'svelte';
	import { Check } from 'lucide-svelte';
	import { ChevronsUpDown } from 'lucide-svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import { cn } from '$lib/utils.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';




  async function searchLocations(query: string) {
    // Make a request to the google api to get the locations

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    );

    
  }





	let open = false;

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Popover.Root bind:open let:ids>
		<Popover.Trigger
    {...$$restProps}
			class={cn(

				buttonVariants({ variant: 'outline' }),
				'w-[200px] justify-between',
			)}
			role="combobox"
		>

			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input autofocus placeholder="Search language..." class="h-9" />
			<Command.Empty>No language found.</Command.Empty>
			<Command.Group>
				{#each languages as language}
					<Command.Item
						value={language.value}
						onSelect={() => {
							$formData.language = language.value;
							closeAndFocusTrigger(ids.trigger);
						}}
					>
						{language.label}
						<Check
							class={cn(
								'ml-auto h-4 w-4',
								language.value !== $formData.language && 'text-transparent'
							)}
						/>
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
