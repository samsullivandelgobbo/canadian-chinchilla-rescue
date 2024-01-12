<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import { Folder } from 'lucide-svelte';

	import {
		Activity,
		Archive,
		CreditCard,
		Edit,
		Eye,
		MoreHorizontal,
		Plus,
		Trash,
		Trash2,
		Users
	} from 'lucide-svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	import * as Table from '$lib/components/ui/table';
	import { useSWR } from 'sswr';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import * as Card from '$lib/components/ui/card';
	import type { Draft, Post, User } from '@prisma/client';
	import { Separator } from '$lib/components/ui/separator';

	import type { PageData } from '../$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	export let data: PageData;

	async function handlePostDelete() {
		const res = await fetch(`/api/blog/${postToDelete.id}`, {
			method: 'DELETE'
		});

		if (res.status === 200) {
			toast('Post has been deleted', {
				action: {
					label: 'Undo',
					onClick: () => undoPostDelete()
				}
			});
			posts = posts.filter((post) => post.id !== postToDelete.id);
		} else {
			toast.error('Something went wrong removing the post');
		}
	}

	async function undoPostDelete() {
		if (!postToDelete) {
			toast.error('There was an error restoring the post');
			return;
		}
		const res = await fetch(`/api/blog/publish`, {
			method: 'POST',
			body: JSON.stringify({
				title: postToDelete.title,
				description: postToDelete.description,
				content: postToDelete.content,
				coverImage: postToDelete.image,
				tags: postToDelete.tags
			})
		});

		if (res.status === 200) {
			postToDelete = null;
			const data = await res.json();
			const post = data.post;
			posts = [...posts, post];

			toast('Post has been restored');
		} else {
			toast.error('Something went wrong restoring the post');
		}
	}

	async function unpublishPost() {}

	async function undoDraftDelete() {
		if (!draftToDelete) {
			toast.error('There was an error restoring the draft');
			return;
		}
		const res = await fetch(`/api/blog/draft/${draftToDelete.id}`, {
			method: 'POST',
			body: JSON.stringify({
				title: draftToDelete.title,
				description: draftToDelete.description,
				content: draftToDelete.content
			})
		});

		if (res.status === 200) {
			drafts = [...drafts, draftToDelete];
			draftToDelete = null;

			toast('Draft has been restored');
		} else {
			toast.error('Something went wrong restoring the draft');
		}

		draftToDelete = null;
		toast.dismiss();
		toast('Draft has been restored');
	}

	async function handleDraftDelete() {
		if (draftToDelete) {
			const res = await fetch(`/api/blog/draft/${draftToDelete.id}`, {
				method: 'DELETE'
			});

			if (res.status === 200) {
				toast('Draft has been deleted', {
					action: {
						label: 'Undo',
						onClick: () => undoDraftDelete()
					}
				});
				drafts = drafts.filter((draft) => draft.id !== draftToDelete.id);
			} else {
				toast.error('Something went wrong removing the draft');
			}
		} else {
			console.error('No draft to delete');
		}
	}

	let draftToDelete: Draft | null = null;
	let deletePostCheck = false;

	let postToDelete: Post | null = null;
	let deleteDraftCheck = false;
	let posts = data.posts;
	let drafts = data.drafts;
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Total Posts</Card.Title>
			<Users class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">
				{posts.length}
			</div>
			<p class="text-xs text-green-500" />
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Total Drafts</Card.Title>
			<CreditCard class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">
				{drafts.length}
			</div>
			<p class="text-xs text-muted-foreground" />
		</Card.Content>
	</Card.Root>

	<Card.Root>
		<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
			<Card.Title class="text-sm font-medium">Total Views</Card.Title>
			<Activity class="h-4 w-4 text-muted-foreground" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold text-gray-500" />
			<p class="text-xs text-muted-foreground">Coming soon</p>
		</Card.Content>
	</Card.Root>
</div>
<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7 pt-4">
	<Card.Root class="col-span-7">
		<Card.Header>
			<div class="flex w-full justify-between">
				<Card.Title>Overview</Card.Title>

				<a href="/admin/blog/new">
					<Button variant="default">
						Create New Post
						<Plus class="h-4 w-4 ml-2" />
					</Button>
				</a>
			</div>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col gap-8">
				<h3 class="text-lg font-medium">Published Posts</h3>
				{#if posts.length === 0}
					<div class="text-center">
						<p class="text-gray-500">No posts yet</p>
						<Folder class="h-12 w-12 mx-auto text-gray-400" />
				
					</div>
				{/if}
				{#each posts as post}
					<Separator />

					<div class="relative">
						<div class="absolute top-4 right-4 z-50">
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild let:builder>
									<Button variant="ghost" size="icon" builders={[builder]}>
										<MoreHorizontal class="h-5 w-5" />
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<!-- <DropdownMenu.Item href={`/admin/blog/${post.id}`}>
										<Edit class="h-5 w-5 mr-2" />
										Edit
									</DropdownMenu.Item> -->
									<DropdownMenu.Item href={`/admin/blog/${post.id}?publish`}>
										<Archive class="h-5 w-5 mr-2" />
										Unpublish
									</DropdownMenu.Item>
									<DropdownMenu.Item href={`/admin/blog/${post.id}?preview`}>
										<Eye class="h-5 w-5 mr-2" />
										Preview
									</DropdownMenu.Item>

									<DropdownMenu.Item
										class="text-red-500 "
										on:click={() => {
											postToDelete = null;
											postToDelete = post;

											deletePostCheck = true;
										}}
									>
										<Trash2 class="h-5 w-5 mr-2" />
										Delete
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</div>

						<PostCard {post} admin={true} />
					</div>
				{/each}

				<Separator class="my-8" />

				<h3 class="text-lg font-medium">Drafts</h3>
				<Separator />

				<Table.Root>
					<Table.Caption>All post drafts</Table.Caption>
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-[100px]">Updated</Table.Head>
							<Table.Head>Title</Table.Head>
							<Table.Head class="hidden sm:block">Description</Table.Head>
							<Table.Head class="text-right">Length</Table.Head>
							<Table.Head class="text-right">Actions</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each drafts as draft, i (i)}
							<Table.Row>
								<Table.Cell class="font-light"
									>{draft.updatedAt.toLocaleDateString('en', {
										month: 'numeric',
										day: 'numeric',
										year: 'numeric'
									})}
									<br />
									{draft.updatedAt.toLocaleTimeString('en', {
										hour: 'numeric',
										minute: 'numeric'
									})}
								</Table.Cell>
								<Table.Cell>{draft.title}</Table.Cell>
								<Table.Cell class="hidden sm:block"
									>{draft.description ? draft.description : ''}</Table.Cell
								>
								<Table.Cell class="text-right"
									>{draft.content && draft.content.length ? draft.content.length : '0'}</Table.Cell
								>
								<Table.Cell class="text-right">
									<DropdownMenu.Root>
										<DropdownMenu.Trigger asChild let:builder>
											<Button variant="ghost" size="icon" builders={[builder]}>
												<MoreHorizontal class="h-5 w-5" />
											</Button>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content>
											<DropdownMenu.Item href={`/admin/blog/${draft.id}`}>
												<Edit class="h-5 w-5 mr-2" />
												Edit
											</DropdownMenu.Item>
											<DropdownMenu.Item href={`/admin/blog/${draft.id}?publish`}>
												<Archive class="h-5 w-5 mr-2" />
												Publish
											</DropdownMenu.Item>
											<DropdownMenu.Item href={`/admin/blog/${draft.id}?preview`}>
												<Eye class="h-5 w-5 mr-2" />
												Preview
											</DropdownMenu.Item>

											<DropdownMenu.Item
												class="text-red-500 "
												on:click={() => {
													draftToDelete = null;
													draftToDelete = draft;

													deleteDraftCheck = true;
												}}
											>
												<Trash2 class="h-5 w-5 mr-2" />
												Delete
											</DropdownMenu.Item>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>

			<AlertDialog.Root bind:open={deleteDraftCheck}>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
						<AlertDialog.Description>
							This action cannot be undone. This will permanently the draft
							<strong>{draftToDelete?.title}</strong>
							and its contents.
						</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<AlertDialog.Action
							on:click={() => {
								handleDraftDelete();
							}}>Delete</AlertDialog.Action
						>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<AlertDialog.Root bind:open={deletePostCheck}>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
						<AlertDialog.Description>
							This action cannot be undone. This will permanently the post
							<strong>{postToDelete?.title}</strong>
							and its contents.
						</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<AlertDialog.Action
							on:click={() => {
								handlePostDelete();
							}}>Delete</AlertDialog.Action
						>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</Card.Content>
	</Card.Root>
</div>
