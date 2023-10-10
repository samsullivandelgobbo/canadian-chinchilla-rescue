<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import Editor from '@toast-ui/editor';
	import '@toast-ui/editor/dist/toastui-editor.css';

	export let initialValue = '';

	let editor: any;
	let editorContainer: any;

	onMount(() => {
		editor = new Editor({
			el: editorContainer,
			height: '400px',
			initialValue,
			initialEditType: 'markdown',
			placeholder: 'Write here...'
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

<div bind:this={editorContainer} />
