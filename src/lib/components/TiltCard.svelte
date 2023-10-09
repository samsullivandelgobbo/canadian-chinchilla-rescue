<script>
	let mouseX = 0;
	let mouseY = 0;
	let tiltX = 0;
	let tiltY = 0;

	function handleMouseMove(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		tiltX = (y / rect.height - 0.5) * 10;
		tiltY = -(x / rect.width - 0.5) * 10;
	}

	function handleMouseLeave() {
		tiltX = 0;
		tiltY = 0;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="card max-w-sm shadow-md rounded-xl cursor-pointer bg-white"
	on:mousemove={handleMouseMove}
	on:mouseleave={handleMouseLeave}
	style="transform: rotateX({tiltX}deg) rotateY({tiltY}deg);"
>
	<slot />
</div>

<style>
	.card {
		transition: transform 0.1s ease, background 0.1s ease;
	}
</style>
