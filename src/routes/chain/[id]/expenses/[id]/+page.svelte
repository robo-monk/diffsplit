<script lang="ts">
	import { Button, Tag, TextInput } from 'carbon-components-svelte';
	import type { LayoutData } from '../../$types';

	export let data: LayoutData;
	let { chain, user } = data;

	let name = '';
	let disabled = true;
	$: disabled = !name;

	// let amount;

	// $: amount = chain.expenses.reduce((acc, expense) => {
	// acc + expense.amount
	// expense.splits.find(split => split.userId === user.id).amount
	// }, 0)
</script>

{#if chain}
	<div class="my-5 w-100">
		<!-- <span class="text-sm text-gray-500"> {} </span> -->
		<Tag type="purple">{chain.name}</Tag>

		<h1>{chain.name}</h1>
		<div class="mt-5">
			<form method="POST" action="?/create">
				<input type="hidden" name="chainId" value={chain.id} />
				<!-- <Input name="name" placeholder="Name" /> -->
				<TextInput
					labelText="Expense name"
					placeholder="Koffie"
					name="expenseName"
					bind:value={name}
				/>
				<Button type="submit" {disabled}>Set amount</Button>
			</form>
		</div>

		<div class="my-5" />

		<!-- <Button href="/chain/{chain.id}/expenses/new"> New Expense </Button> -->
	</div>
{/if}
