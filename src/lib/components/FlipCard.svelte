<script>
	let flipped = false;
	function toggleFlip() {
		flipped = !flipped;
	}
</script>

<div class="card-container" on:click={toggleFlip}>
	<div class="card" style="--rotateY: {flipped ? '180deg' : '0deg'}">
		<div class="card-face card-front">Front of the card</div>
		<div class="card-face card-back">Back of the card</div>
	</div>
</div>

<style>
	.card-container {
		width: 200px;
		height: 300px;
		perspective: 1000px;
		cursor: pointer;
	}

	.card {
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: transform 0.5s;
		transform: rotateY(var(--rotateY, 0deg));
	}

	.card-face {
		width: 100%;
		height: 100%;
		position: absolute;
		backface-visibility: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #ddd;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
	}

	.card-front {
		background-color: white;
	}

	.card-back {
		background-color: #f5f5f5;
		transform: rotateY(180deg);
	}
</style>
