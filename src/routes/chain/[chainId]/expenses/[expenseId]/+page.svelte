<script lang="ts">
	import { Button, Tag, TextInput } from 'carbon-components-svelte';
	import type { LayoutData } from '../../$types';

	export let data: LayoutData;
	let { chain, user, expense } = data;

	let name = '';
	let disabled = true;

	$: disabled = !name;

	// let amount;

	// $: amount = chain.expenses.reduce((acc, expense) => {
	// acc + expense.amount
	// expense.splits.find(split => split.userId === user.id).amount
	// }, 0)
</script>

{#if expense}
	<h1>{expense?.name || 'New'}</h1>
	<div class="mt-5">
		<form method="POST" action="?/create">
			<!-- <input type="hidden" name="chainId" value={chain.id} /> -->
			<!-- <Input name="name" placeholder="Name" /> -->
			<TextInput
				labelText="Expense name"
				placeholder="Koffie"
				name="name"
				bind:value={name}
			/>
			<Button type="submit" {disabled}>Set amount</Button>
		</form>
	</div>

{:else}
	<h1>'New'</h1>
	<div class="mt-5">
		<form method="POST" action="?/create">
			<!-- <input type="hidden" name="chainId" value={chain.id} /> -->
			<!-- <Input name="name" placeholder="Name" /> -->
			<TextInput
				labelText="Expense name"
				placeholder="Koffie"
				name="name"
				bind:value={name}
			/>
			<Button type="submit" {disabled}>Set amount</Button>
		</form>
	</div>
{/if}
