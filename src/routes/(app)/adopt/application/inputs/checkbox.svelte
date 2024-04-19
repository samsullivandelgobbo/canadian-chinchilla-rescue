<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { SvelteComponent } from 'svelte';

	export let form;

	export let label: string | SvelteComponent;
	export let name: string | SvelteComponent;
	export let value: boolean;
	export let description: string | SvelteComponent;
</script>

<div class="flex w-full lg:col-span-2 justify-between">
	<Form.Field
		name="timeResponsibility"
		{form}
		class="w-full flex justify-between items-center gap-2"
	>
		<Form.Control let:attrs>
			<div class="flex flex-col gap-2 w-full">
				<Form.Label>
					{label}
				</Form.Label>
				<Form.Description>
					{description}
				</Form.Description>

				<Form.FieldErrors />
			</div>
			<input name={attrs.name} {value} hidden />
			<Checkbox {...attrs} bind:checked={value} class="h-8 w-8 items-center justify-center flex" />
		</Form.Control>
	</Form.Field>
</div>
