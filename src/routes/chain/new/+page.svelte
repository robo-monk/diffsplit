<script lang="ts">
	import { onMount } from 'svelte';
	// import { createChain } from '../../lib/api';
	import { Button, TextInput } from 'carbon-components-svelte';
	import { goto } from '$app/navigation';
	// import { TextInput } from 'carbon-components-svelte';

	// export let params;

	let chainId;

	onMount(async () => {
		// chainId = await createChain();
		// goto(`/chain/${chainId}`);
	});
</script>

<div class="my-5 w-100">
	<span class="text-sm text-gray-500"> New </span>
	<h1>Expense Chain</h1>

	<div class="my-5">
		<TextInput labelText="Chain name" placeholder="Fluffy coder" />
	</div>
	<Button type="submit">Create</Button>

	<!-- <Button on:click={() => goto(`/chain/${params.chainId}`)}>Create a chain</Button> -->
</div>
