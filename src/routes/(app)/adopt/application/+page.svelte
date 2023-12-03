<script lang="ts">
	import type { PageData } from './$types';
	import ApplicationForm from './application-form.svelte';
	export let data: PageData;
	console.log(data.form);
</script>

<ApplicationForm form={data.form} />
