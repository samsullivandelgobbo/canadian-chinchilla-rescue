<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	export let modalId: any;
	export let showModal: boolean;

	const dispatch = createEventDispatcher();

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();

	const closeModal = () => {
		if (dialog.open) {
			dialog.close();
			dispatch('close', modalId);
		}
	};
	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			closeModal();
		}
	};
</script>

<svelte:window on:keydown={handleKeyDown} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	class="dialog max-w-md absolute bottom-0 lg:static md:max-w-4xl p-8 rounded-xl"
	bind:this={dialog}
	on:close={closeModal}
	on:click|self={closeModal}
>
	<button class="flex absolute top-0 right-0 p-4" on:click={closeModal}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-x"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M18 6l-12 12" />
			<path d="M6 6l12 12" />
		</svg>
	</button>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation>
		<slot />

		<!-- svelte-ignore a11y-autofocus -->
	</div>
</dialog>

<style>
	.dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	.dialog[open] {
		animation: zoom 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.9);
		}
		to {
			transform: scale(1);
		}
	}
	.dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
