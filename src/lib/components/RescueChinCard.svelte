<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Chinchilla } from '@prisma/client';
	import { Badge } from '$lib/components/ui/badge';

	export let chinchilla: Chinchilla;

	let flipped = false;
	export let disabled = false;

	function toggleFlip() {
		console.log('flipped');
		flipped = !flipped;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<Card.Root class="w-full rounded-2xl  " {...$$restProps}>
	<!-- <a
		href={`/adopt/${chinchilla.name.toLowerCase().replace(' ', '-')}`}
		class="h-full w-full
{disabled ? 'pointer-events-none' : ''}
  "
	> -->
	<img
		class="aspect-[3/2] w-full rounded-t-2xl object-cover"
		src={chinchilla.photos[0] ? chinchilla.photos[0] : '/logo.png'}
		alt={chinchilla.name}
	/>
	<Card.Content />
	<Card.Footer>
		<div class="flex flex-col gap-2 w-full">
			<div class="flex w-full flex-row justify-between">
				<Card.Title>
					{chinchilla.name}
				</Card.Title>
				<Card.Description>
					{chinchilla.color}
				</Card.Description>
			</div>
			<div class="flex w-full flex-row justify-between">
				<Card.Description>
					{chinchilla.age}
					{chinchilla.age > 1 ? 'years' : 'year'} old
				</Card.Description>
				<Badge
					class={chinchilla.friendly
						? 'bg-green-100 text-green-800 hover:bg-green-200'
						: 'bg-red-100 text-red-800'}
				>
					{chinchilla.friendly ? 'Friendly' : 'Not Friendly'}
				</Badge>
			</div>
		</div>
	</Card.Footer>
	<!-- </a> -->
</Card.Root>
