<script lang="ts">
	import { onMount } from 'svelte';
	// import { createChain } from '../../lib/api';
	import { Button, TextInput } from 'carbon-components-svelte';
	import { goto } from '$app/navigation';
	import type { ActionData } from './$types';
	// import { TextInput } from 'carbon-components-svelte';

	// export let params;

	let disabled = true;
	let input: string = '';
	$: disabled = !input;

	export let form: ActionData;

	onMount(async () => {
		if (form?.success && form?.chain?.id) {
			goto(`/chain/${form.chain.id}/join`);
		}
		// chainId = await createChain();
		// goto(`/chain/${chainId}`);
	});
</script>

<div class="my-5 w-100">
	<span class="text-sm text-gray-500"> New </span>
	<h1>Expense Chain</h1>

	<form method="POST" action="?/createChain">
		<TextInput
			labelText="Chain name"
			placeholder="Fluffy coder"
			name="chainName"
			bind:value={input}
		/>
		<Button type="submit" {disabled}>Create</Button>
	</form>

	<div class="my-5" />

	<!-- <Button on:click={() => goto(`/chain/${params.chainId}`)}>Create a chain</Button> -->
</div>
