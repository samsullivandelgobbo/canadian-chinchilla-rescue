<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import Editor from '@toast-ui/editor';
	import '@toast-ui/editor/dist/toastui-editor.css';

	const dispatch = createEventDispatcher();

	let editor: any;
	let editorContainer: any;

	export let content: string = '';

	onMount(() => {
		editor = new Editor({
			el: editorContainer,
			height: '70vh',


			initialValue: content,
			initialEditType: 'wysiwyg',
			placeholder: 'Write here...',
			events: {
				change: () => {
					dispatch('change', getMarkdown());
				}
			}
			// ... other configuration options
		});

		return () => {
			editor.destroy();
		};
	});

	function getMarkdown() {
		return editor.getMarkdown();
	}
</script>

<div
	bind:this={editorContainer}
	on:input={() => {
		dispatch('change', getMarkdown());
	}}
/>
