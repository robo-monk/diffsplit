<script lang="ts">
	import { Button, Tag } from 'carbon-components-svelte';
	import type { LayoutData } from './$types';
	import ExpenseRow from './expenses/ExpenseRow.svelte';

	export let data: LayoutData;
	let chain = data.chain;
</script>

{#if chain}
	<!-- <span class="text-sm text-gray-500"> {} </span> -->

	<h1>{chain.name}</h1>
	<div class="mt-5">
		{#each chain.users as user}
			<Tag type="green">{user.username}</Tag>
		{/each}

		{#each chain.expenses as expense}
			<div class="my-5">
				<ExpenseRow {expense} />

			</div>
		{/each}

		<div />
		<form method="POST" action="?/join">
			<input type="hidden" name="chainId" value={chain.id} />
		</form>
	</div>

	<div class="my-5" />

	<Button href="/chain/{chain.id}/expenses/new">New Expense</Button>
{/if}
