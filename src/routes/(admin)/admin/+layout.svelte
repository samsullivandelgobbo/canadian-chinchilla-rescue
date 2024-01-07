<script lang="ts">
	import AdminHeader from '$lib/components/AdminHeader.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<AdminHeader />
<div class="bg-white">
	<Toaster theme="light" />
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		<slot />
	</div>
</div>
