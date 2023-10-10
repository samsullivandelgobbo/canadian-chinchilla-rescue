<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="font-onest">
	<Navbar />

	<slot />

	<Footer />
</div>
