<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ExternalLink } from 'lucide-svelte';

	export let id: string;
</script>

<a href={`/admin/applications/${id}`}>
	<Button variant="outline"
		>View Application
		<ExternalLink class="w-4 h-4 ml-2" />
	</Button>
</a>
