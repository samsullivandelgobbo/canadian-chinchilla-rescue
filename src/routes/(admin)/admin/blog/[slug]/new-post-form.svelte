<script lang="ts" context="module">
	import { z } from 'zod';
	const languages = [
		{ label: 'English', value: 'en' },
		{ label: 'French', value: 'fr' },
		{ label: 'German', value: 'de' },
		{ label: 'Spanish', value: 'es' },
		{ label: 'Portuguese', value: 'pt' },
		{ label: 'Russian', value: 'ru' },
		{ label: 'Japanese', value: 'ja' },
		{ label: 'Korean', value: 'ko' },
		{ label: 'Chinese', value: 'zh' }
	] as const;
	type Language = (typeof languages)[number]['value'];
	export const formSchema = z.object({
		language: z.enum(languages.map((f) => f.value) as [Language, ...Language[]], {
			errorMap: () => ({ message: 'Please select a valid language.' })
		})
	});
	export type FormSchema = typeof formSchema;
</script>

<script lang="ts">
	import type { Post } from '@prisma/client';
	import type { PageData } from './$types';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Button } from '$lib/components/ui/button';

	import { onMount } from 'svelte';
	import { enhance, applyAction } from '$app/forms';
	import type { SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { Label } from '$lib/components/ui/label';
	import { Trash } from 'lucide-svelte';
	import Switch from '$lib/components/ui/switch/switch.svelte';
	import * as Select from '$lib/components/ui/select';
	import * as Alert from '$lib/components/ui/alert';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Form from '$lib/components/ui/form';

	export let form;
</script>

<div class="mx-auto max-w-4xl">
	<!-- <Form.Root></Form.Root> -->
	<div class="bg-white shadow sm:rounded-lg px-4 py-5">
		<div class="flex flex-col p-1">
			<Label for="title">Title</Label>

			<div class="mt-2 gap-4 flex flex-col sm:items-start sm:justify-between">
				<div class="max-w-xl text-sm text-gray-500">
					<p>Write a title for the post.</p>
				</div>
				<Input name="title" bind:value={blogTitle} />
			</div>
		</div>
	</div>
</div>
