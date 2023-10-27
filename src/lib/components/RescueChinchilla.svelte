<script lang="ts">
	import type { Chinchilla } from '@prisma/client';

	export let chinchilla: Chinchilla;
</script>

<li>
	<img class="aspect-[3/2] w-full rounded-2xl object-cover" src="/img/dexter.png" alt="" />
	<div class="flex flex-col">
		<div class="flex flex-row justify-between">
			<h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
				{chinchilla.name}
			</h3>
			<h5 class="mt-8 text-md font-bold text-gray-800">
				{chinchilla.age}
				years old
			</h5>
		</div>
		<div class="flex flex-row justify-between">
			<p class="text-base leading-7 text-gray-600">
				{chinchilla.color + ' ' + chinchilla.gender}
			</p>
			<p
				class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800"
			>
				Available
			</p>
		</div>
	</div>
</li>
