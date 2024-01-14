<script lang="ts">
	import { onMount } from 'svelte';
	import NewChinchilla from '$lib/img/chin-winter-icon.png';
	import HoneyChinchilla from '$lib/img/chin-honey-icon.png';
	import ShopIcon from '$lib/img/apple-sticks-icon.png';
	import TreatChinchilla from '$lib/img/chin-treat-icon.png';
	import { createTable, Subscribe, Render, createRender } from 'svelte-headless-table';
	import DataTableActions from '$lib/components/data-table/actions.svelte';
	import {
		addSortBy,
		addPagination,
		addTableFilter,
		addSelectedRows,
		addHiddenColumns
	} from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';

	import * as Table from '$lib/components/ui/table';
	// import Actions from './data-table/data-table-actions.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { cn } from '$lib/utils';
	import { Input } from '$lib/components/ui/input';
	// import DataTableCheckbox from './data-table/data-table-checkbox.svelte';
	import { ArrowUpDown, ChevronDown } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';

	import type { RescueApplication } from '@prisma/client';

	export let applications: RescueApplication[];

	const table = createTable(readable(applications), {
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

		// table.column({
		// 	header: 'Status',
		// 	accessor: 'status',
		// 	cell: ({ value }) => {
		// 		return value === 'PENDING' ? 'Pending' : 'Approved';
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
			header: 'Name',
			accessor: 'firstName',

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
			header: 'Age',
			accessor: 'age',

			plugins: {
				filter: {
					getFilterValue(value) {
						return value;
					}
				},

				hide: {}
			}
		}),
		table.column({
			header: 'Has cage?',
			accessor: 'hasCage',
			cell: ({ value }) => (value ? 'Yes' : 'No'),

			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			header: 'Pets in home?',
			accessor: 'hasPets',
			cell: ({ value }) => (value ? 'Yes' : 'No'),

			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			accessor: ({ id, email }) => {
				return { id, email };
			},
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, { id: value.id.toString(), email: value.email });
			}
		})
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

	const hideableCols = ['firstName', 'email', 'age'];
</script>

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
											{#if cell.id === 'status'}
												<Button variant="ghost" on:click={props.sort.toggle}>
													<Render of={cell.render()} />
													<ArrowUpDown
														class={cn(
															$sortKeys[0]?.id === cell.id && 'text-foreground',
															'ml-2 h-4 w-4'
														)}
													/>
												</Button>
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
			<!-- <div class="flex-1 text-sm text-muted-foreground">
				{Object.keys($selectedDataIds).length} of{' '}
				{$rows.length} row(s) selected.
			</div> -->
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
