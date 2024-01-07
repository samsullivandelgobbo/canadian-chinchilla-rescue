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
	import ApplicationsTable from '$lib/components/ApplicationsTable.svelte';
	import type { RescueApplication } from '@prisma/client';

	export let data: PageData;
	const applications = data.applications as RescueApplication[];
	console.log(applications);

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
</script>

<div class="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
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
			>
				{applicationsThisWeek.length - applicationsLastWeek.length} from last week
			</p>
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
			>
				+{applications.length - applicationsLastWeek.length} from last week
			</p>
		</Card.Content>
	</Card.Root>
	<!-- <Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Unread Applications</Card.Title>
			<CreditCard class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">12</div>
		</Card.Content>
	</Card.Root> -->
	<!-- <Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Active Now</Card.Title>
					<Activity class="h-4 w-4 text-muted-foreground" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">+573</div>
					<p class="text-xs text-muted-foreground">+201 since last hour</p>
				</Card.Content>
			</Card.Root> -->
</div>

<ApplicationsTable {applications} />

<!-- <Card.Root class="flex col-span-3 p-4 flex-col mt-4">
			<div class="w-full">
				<div class="flex items-center py-4">
					<Input
						class="max-w-sm"
						placeholder="Filter emails..."
						type="text"
						bind:value={$filterValue}
					/>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button variant="outline" class="ml-auto" builders={[builder]}>
								Columns <ChevronDown class="ml-2 h-4 w-4" />
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							{#each flatColumns as col}
								{#if hideableCols.includes(col.id)}
									<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
										{col.header}
									</DropdownMenu.CheckboxItem>
								{/if}
							{/each}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
				<div class="rounded-md border">
					<Table.Root {...$tableAttrs}>
						<Table.Header>
							{#each $headerRows as headerRow}
								<Subscribe rowAttrs={headerRow.attrs()}>
									<Table.Row>
										{#each headerRow.cells as cell (cell.id)}
											<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
												<Table.Head {...attrs} class={cn('[&:has([role=checkbox])]:pl-3')}>
													{#if cell.id === 'amount'}
														<div class="text-right font-medium">
															<Render of={cell.render()} />
														</div>
													{:else if cell.id === 'email'}
														<Button variant="ghost" on:click={props.sort.toggle}>
															<Render of={cell.render()} />
															<ArrowUpDown
																class={cn(
																	$sortKeys[0]?.id === cell.id && 'text-foreground',
																	'ml-2 h-4 w-4'
																)}
															/>
														</Button>
													{:else}
														<Render of={cell.render()} />
													{/if}
												</Table.Head>
											</Subscribe>
										{/each}
									</Table.Row>
								</Subscribe>
							{/each}
						</Table.Header>
						<Table.Body {...$tableBodyAttrs}>
							{#each $pageRows as row (row.id)}
								<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
									<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
										{#each row.cells as cell (cell.id)}
											<Subscribe attrs={cell.attrs()} let:attrs>
												<Table.Cell class="[&:has([role=checkbox])]:pl-3" {...attrs}>
													{#if cell.id === 'amount'}
														<div class="text-right font-medium">
															<Render of={cell.render()} />
														</div>
													{:else if cell.id === 'status'}
														<div class="capitalize">
															<Render of={cell.render()} />
														</div>
													{:else}
														<Render of={cell.render()} />
													{/if}
												</Table.Cell>
											</Subscribe>
										{/each}
									</Table.Row>
								</Subscribe>
							{/each}
						</Table.Body>
					</Table.Root>
				</div>

				<div class="flex items-center justify-end space-x-2 py-4">
					<div class="flex-1 text-sm text-muted-foreground">
						{Object.keys($selectedDataIds).length} of{' '}
						{$rows.length} row(s) selected.
					</div>
					<Button
						variant="outline"
						size="sm"
						on:click={() => ($pageIndex = $pageIndex - 1)}
						disabled={!$hasPreviousPage}>Previous</Button
					>
					<Button
						variant="outline"
						size="sm"
						disabled={!$hasNextPage}
						on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
					>
				</div>
			</div>
		</Card.Root> -->
