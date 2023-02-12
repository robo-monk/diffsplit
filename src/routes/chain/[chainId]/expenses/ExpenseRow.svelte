<script lang="ts">
	import type { Expense } from '$lib/server/repositories/expense.repository';
	import { Tag } from 'carbon-components-svelte';

	export let expense: Expense;
</script>

<h2>{expense.name}</h2>
{#each expense.splits as split}
	<div class="my-5">
		<Tag type="purple">{split?.user?.username}</Tag>
		<h3>{split.amount}</h3>
	</div>
{/each}
