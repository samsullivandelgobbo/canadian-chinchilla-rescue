<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Toaster } from 'svelte-sonner';
</script>

<div class="font-onest">
	<Toaster theme="light" richColors />
	<Navbar />

	<slot />

	<Footer />
</div>
