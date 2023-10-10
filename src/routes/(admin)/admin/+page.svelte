<script>
	import AdminHeader from '$lib/components/AdminHeader.svelte';
	import { onMount } from 'svelte';
	let ToastEditor;

	onMount(async () => {
		const module = await import('$lib/components/ToastEditor.svelte');
		ToastEditor = module.default;
	});
</script>

<!-- {#if ToastEditor}
	<svelte:component this={ToastEditor} />
{/if} -->
