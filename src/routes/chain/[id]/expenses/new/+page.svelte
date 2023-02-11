<script lang="ts">
	import { Button, Tag } from 'carbon-components-svelte';
	import type { LayoutData } from '../../$types';

	export let data: LayoutData;
	let { chain } = data;

	let amount;

	// $: amount = chain.expenses.reduce((acc, expense) => {
	// acc + expense.amount
	// expense.splits.find(split => split.userId === user.id).amount
	// }, 0)
</script>

<div class="my-5 w-100">
	<!-- <span class="text-sm text-gray-500"> {} </span> -->
	<Tag type="purple">{chain.name}</Tag>

	<h1>{chain.name}</h1>
	<div class="mt-5">
		<form method="POST" action="?/join">
			<input type="hidden" name="chainId" value={chain.id} />
		</form>
	</div>

	<div class="my-5" />

	<!-- <Button href="/chain/{chain.id}/expenses/new"> New Expense </Button> -->
</div>
