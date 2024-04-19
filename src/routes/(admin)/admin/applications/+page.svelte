<script lang="ts">
	import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table';
	import {
		addSortBy,
		addPagination,
		addTableFilter,
		addSelectedRows,
		addHiddenColumns
	} from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import { Activity, Calendar, CreditCard, DollarSign, Download, Users } from 'lucide-svelte';
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
	import type { PageData } from './$types';
	import ApplicationsTable from '$lib/components/data-table/applications/applications.svelte';
	import type { RescueApplication } from '@prisma/client';

	export let data: PageData;
	const applications = data.applications as RescueApplication[];

	const unreadApplications = applications.filter((application) => application.status === 'unread');

	// sort applications by most recent
	const sortedApplications = applications.sort((a, b) => {
		const dateA = new Date(a.createdAt);
		const dateB = new Date(b.createdAt);
		return dateB - dateA;
	});

	const applicationsThisWeek = applications.filter((application) => {
		const date = new Date(application.createdAt);
		const today = new Date();
		const weekAgo = new Date(today.setDate(today.getDate() - 7));
		return date > weekAgo;
	});

	const applicationsLastWeek = applications.filter((application) => {
		// grab all applications from 2 weeks ago
		const date = new Date(application.createdAt);
		const today = new Date();
		const weekAgo = new Date(today.setDate(today.getDate() - 7));
		const twoWeeksAgo = new Date(today.setDate(today.getDate() - 14));
		return date > twoWeeksAgo && date < weekAgo;
	});

	const archivedApplications = applications.filter((application) => application.archived);
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Applications this week</Card.Title>
			<Calendar class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">
				{applicationsThisWeek.length}
			</div>
			<p
				class="text-xs text-muted-foreground
      {applicationsThisWeek.length - applicationsLastWeek.length > 0
					? 'text-green-500'
					: 'text-red-500'}
      "
			/>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Unread Applications</Card.Title>
			<Users class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">
				{unreadApplications.length}
			</div>
			<p
				class="text-xs
      {applicationsThisWeek.length - applicationsLastWeek.length > 0
					? 'text-red-500'
					: 'text-green-500'}
      
      "
			/>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Total Applications</Card.Title>
			<Users class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">
				{applications.length}
			</div>
			<p
				class="text-xs
      {applicationsThisWeek.length - applicationsLastWeek.length > 0
					? 'text-red-500'
					: 'text-green-500'}
      
      "
			/>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Archived Applications</Card.Title>
			<Users class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">
				{archivedApplications.length}
			</div>
			<p
				class="text-xs
      {applicationsThisWeek.length - applicationsLastWeek.length > 0
					? 'text-red-500'
					: 'text-green-500'}
      
      "
			/>
		</Card.Content>
	</Card.Root>
</div>

<ApplicationsTable {applications} />
