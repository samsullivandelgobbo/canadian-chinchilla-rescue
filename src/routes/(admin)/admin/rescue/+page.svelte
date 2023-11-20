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

	type Payment = {
		id: string;
		amount: number;
		status: 'Pending' | 'Processing' | 'Success' | 'Failed';
		email: string;
	};

	const data: Payment[] = [
		{
			id: 'm5gr84i9',
			amount: 316,
			status: 'Success',
			email: 'ken99@yahoo.com'
		},
		{
			id: '3u1reuv4',
			amount: 242,
			status: 'Success',
			email: 'Abe45@gmail.com'
		},
		{
			id: 'derv1ws0',
			amount: 837,
			status: 'Processing',
			email: 'Monserrat44@gmail.com'
		},
		{
			id: '5kma53ae',
			amount: 874,
			status: 'Success',
			email: 'Silas22@gmail.com'
		},
		{
			id: 'bhqecj4p',
			amount: 721,
			status: 'Failed',
			email: 'carmella@hotmail.com'
		}
	];

	const table = createTable(readable(data), {
		sort: addSortBy({ disableMultiSort: true }),
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows(),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([
		// table.column({
		// 	header: (_, { pluginStates }) => {
		// 		const { allPageRowsSelected } = pluginStates.select;
		// 		return createRender(DataTableCheckbox, {
		// 			checked: allPageRowsSelected
		// 		});
		// 	},
		// 	accessor: 'id',
		// 	cell: ({ row }, { pluginStates }) => {
		// 		const { getRowState } = pluginStates.select;
		// 		const { isSelected } = getRowState(row);

		// 		return createRender(DataTableCheckbox, {
		// 			checked: isSelected
		// 		});
		// 	},
		// 	plugins: {
		// 		sort: {
		// 			disable: true
		// 		},
		// 		filter: {
		// 			exclude: true
		// 		}
		// 	}
		// }),
		table.column({
			header: 'Status',
			accessor: 'status',
			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			header: 'Email',
			accessor: 'email',
			cell: ({ value }) => value.toLowerCase(),
			plugins: {
				filter: {
					getFilterValue(value) {
						return value.toLowerCase();
					}
				}
			}
		}),
		table.column({
			header: 'Amount',
			accessor: 'amount',
			cell: ({ value }) => {
				const formatted = new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD'
				}).format(value);
				return formatted;
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		})
		// table.column({
		// 	header: '',
		// 	accessor: ({ id }) => id,
		// 	cell: (item) => {
		// 		return createRender(Actions, { id: item.value });
		// 	},
		// 	plugins: {
		// 		sort: {
		// 			disable: true
		// 		}
		// 	}
		// })
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, flatColumns, pluginStates, rows } =
		table.createViewModel(columns);

	const { sortKeys } = pluginStates.sort;

	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((c) => c.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	const { selectedDataIds } = pluginStates.select;

	const hideableCols = ['status', 'email', 'amount'];
</script>

<div class="bg-white mx-auto max-w-7xl px-24 py-12">
	<div class="  py-12 px-16">
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Current Chinchillas</Card.Title>
					<!-- <img src="/logo.png" alt="Logo" class="h-8 w-auto" /> -->
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">23</div>
					<p class="text-xs text-muted-foreground">+2 from last month</p>
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">New Subscriptions</Card.Title>
					<Users class="h-4 w-4 text-muted-foreground" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">23</div>
					<p class="text-xs text-green-500">+180.1% from last month</p>
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Adoption Applications</Card.Title>
					<CreditCard class="h-4 w-4 text-muted-foreground" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">12</div>
					<p class="text-xs text-muted-foreground">+19% from last month</p>
				</Card.Content>
			</Card.Root>
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">Active Now</Card.Title>
					<Activity class="h-4 w-4 text-muted-foreground" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">+573</div>
					<p class="text-xs text-muted-foreground">+201 since last hour</p>
				</Card.Content>
			</Card.Root>
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
					<Card.Description>You made 265 sales this month.</Card.Description>
				</Card.Header>
				<Card.Content>
					<!-- <RecentSales /> -->
				</Card.Content>
			</Card.Root>
		</div>

		<Card.Root class="flex col-span-3 p-4 flex-col mt-4">
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
		</Card.Root>
	</div>
</div>
