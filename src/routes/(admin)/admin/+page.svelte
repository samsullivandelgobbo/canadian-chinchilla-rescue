<script lang="ts">
	import { onMount } from 'svelte';
	import NewChinchilla from '$lib/img/chin-winter-icon.png';
	import HoneyChinchilla from '$lib/img/chin-honey-icon.png';
	import ShopIcon from '$lib/img/apple-sticks-icon.png';
	import TreatChinchilla from '$lib/img/chin-treat-icon.png';
	import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table';
	import {
		addSortBy,
		addPagination,
		addTableFilter,
		addSelectedRows,
		addHiddenColumns
	} from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import { Activity, CreditCard, DollarSign, Download, Users } from 'lucide-svelte';
	import * as Table from '$lib/components/ui/table';
	// import Actions from './data-table/data-table-actions.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { cn } from '$lib/utils';
	import { Input } from '$lib/components/ui/input';
	// import DataTableCheckbox from './data-table/data-table-checkbox.svelte';
	import { ArrowUpDown, ChevronDown } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
</script>

<Card.Root>
	<div class="p-4">
		<h2 class="text-base font-semibold leading-6 text-gray-900">Dashboard</h2>
		<p class="mt-1 text-sm text-gray-500" />
		<ul
			role="list"
			class="mt-6 grid grid-cols-1 gap-6 border-t border-gray-200 py-6 sm:grid-cols-2"
		>
			<li class="flow-root">
				<div
					class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 hover:bg-gray-50 group"
				>
					<div
						class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50 group-hover:bg-teal-100"
					>
						<img class="h-12 w-12" src={HoneyChinchilla} alt="Blog Icon" />
					</div>
					<div>
						<h3 class="text-sm font-medium text-gray-900">
							<a href="/admin/blog" class="focus:outline-none">
								<span class="absolute inset-0" aria-hidden="true" />
								<span>Create a Blog Post </span>
								<span aria-hidden="true"> &rarr;</span>
							</a>
						</h3>
						<p class="mt-1 text-sm text-gray-500">Start publishing posts to your blog.</p>
					</div>
				</div>
			</li>
			<li class="flow-root">
				<div
					class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 hover:bg-gray-50 group"
				>
					<div
						class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-pink-100 group-hover:bg-pink-300"
					>
						<img class="h-12 w-12" src={NewChinchilla} alt="Shop Icon" />
					</div>
					<div>
						<h3 class="text-sm font-medium text-gray-900">
							<a href="/admin/rescue" class="focus:outline-none">
								<span class="absolute inset-0" aria-hidden="true" />
								<span> New Chinchilla? </span>
								<span aria-hidden="true"> &rarr;</span>
							</a>
						</h3>
						<p class="mt-1 text-sm text-gray-500">Update the available chinchillas for adoption.</p>
					</div>
				</div>
			</li>
			<li class="flow-root">
				<div
					class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 hover:bg-gray-50 group"
				>
					<div
						class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-sky-100 group-hover:bg-sky-300"
					>
						<img class="h-12 w-12" src={TreatChinchilla} alt="Treat Icon" />
					</div>
					<div>
						<h3 class="text-sm font-medium text-gray-900">
							<a href="/admin/applications" class="focus:outline-none">
								<span class="absolute inset-0" aria-hidden="true" />
								<span> View Chinchilla Applications </span>
								<span aria-hidden="true"> &rarr;</span>
							</a>
						</h3>
						<p class="mt-1 text-sm text-gray-500">Review applications for chinchilla adoption.</p>
					</div>
				</div>
			</li>
			<li class="flow-root">
				<div
					class="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 hover:bg-gray-50 group"
				>
					<div
						class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-violet-100 group-hover:bg-violet-300"
					>
						<img class="h-12 w-12" src={ShopIcon} alt="Shop Icon" />
					</div>
					<div>
						<h3 class="text-sm font-medium text-gray-900">
							<a href="/admin/shop" class="focus:outline-none">
								<span class="absolute inset-0" aria-hidden="true" />
								<span> Manage Shop </span>
								<span aria-hidden="true"> &rarr;</span>
							</a>
						</h3>
						<p class="mt-1 text-sm text-gray-500">
							Add, edit, delete, and update products in the shop.
						</p>
					</div>
				</div>
			</li>
		</ul>
	</div>
</Card.Root>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-4">
	<!-- <Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Chinchillas</Card.Title>
			<img src="/logo.png" alt="Logo" class="h-8 w-auto" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">
				{chinchillas.length}
			</div>
			<p class="text-xs text-muted-foreground" />
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Donations This Month</Card.Title>
			<Users class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">$0</div>
			<p class="text-xs text-gray-500">No change from last month</p>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Adoption Applications</Card.Title>
			<CreditCard class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold"></div>
			<p class="text-xs text-muted-foreground">+19% from last month</p>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Page Views</Card.Title>
			<Activity class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">+573</div>
			<p class="text-xs text-muted-foreground">+201 since last hour</p>
		</Card.Content>
	</Card.Root> -->
</div>
<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7 pt-4">
	<Card.Root class="col-span-4">
		<Card.Header>
			<Card.Title>Overview</Card.Title>
		</Card.Header>
		<Card.Content>
			<!-- <Overview /> -->
		</Card.Content>
	</Card.Root>
	<Card.Root class="col-span-3">
		<Card.Header>
			<Card.Title>Recent Sales</Card.Title>
			<Card.Description />
		</Card.Header>
		<Card.Content>
			<!-- <RecentSales /> -->
		</Card.Content>
	</Card.Root>
</div>
