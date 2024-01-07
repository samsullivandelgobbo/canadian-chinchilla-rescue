<script lang="ts">
	import { getForm } from 'formsnap';
	import { toast } from 'svelte-sonner';
	const { message } = getForm();

	$: {
		if ($message) {
			if ($message.error) {
				toast.error($message.error, {
					duration: 5000,
					dismissable: true,
					position: 'top-center'
				});
			}
			if ($message.success) {
				toast.success($message.success, {
					duration: 5000,
					dismissable: true,
					position: 'top-center'
				});
			}
			if ($message.info) {
				toast.info($message.info, {
					duration: 5000,
					dismissable: true,
					position: 'top-center'
				});
			}
			if ($message.warning) {
				toast.warning($message.warning, {
					duration: 5000,
					dismissable: true,
					position: 'top-center'
				});
			}
		}
	}
</script>
