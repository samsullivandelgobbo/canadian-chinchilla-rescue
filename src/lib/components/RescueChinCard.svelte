<script lang="ts">
	import * as Card from '$lib/components/ui/card';
</script>

<a href="#" class="group">
	<img class="aspect-[3/2] w-full rounded-2xl object-cover" src="/img/dexter.png" alt="" />
	<div class="flex flex-col">
		<div class="flex flex-row justify-between">
			<h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">Dexter</h3>
			<h5 class="mt-8 text-md font-bold text-gray-800">5 years old</h5>
		</div>
		<div class="flex flex-row justify-between">
			<p class="text-base leading-7 text-gray-600">Gray Male</p>
			<p
				class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800"
			>
				Available
			</p>
		</div>
	</div>
</a>

<Card.Root>
	<Card.Header>
		<Card.Title>Card Title</Card.Title>
		<Card.Description>Card Description</Card.Description>
	</Card.Header>
	<Card.Content>
		<p>Card Content</p>
	</Card.Content>
	<Card.Footer>
		<p>Card Footer</p>
	</Card.Footer>
</Card.Root>
