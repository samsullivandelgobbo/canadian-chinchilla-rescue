<script lang="ts">
	export let value: string;
</script>

<div class="flex items-center justify-center">
	{#if value === 'unread'}
		<span class="h-2 w-2 bg-blue-500 rounded-full block" />
	{:else if value === 'archived'}
		<span class="h-2 w-2 bg-red-500 rounded-full block" />
	{:else}
		<span class="h-2 w-2 bg-gray-100 rounded-full block" />
	{/if}
</div>
