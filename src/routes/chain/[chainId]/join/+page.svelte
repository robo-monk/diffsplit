<script lang="ts">
	import { onMount } from 'svelte';
	// import { createChain } from '../../lib/api';
	import { Button, TextInput } from 'carbon-components-svelte';
	// import { goto } from '$app/navigation';
	import type { ActionData, PageData, PageServerData } from './$types';
	import type { LayoutData } from '../$types';
	// import { TextInput } from 'carbon-components-svelte';

	export let data: LayoutData;
	let chain = data.chain;
	console.log('[chain]', chain);

	// let chain = params?.chain;

	// console.log('params', params, layout)

	// let chain;
	// $: {
	//     console.log('params', layout)
	//     // chain = params?.chain;
	// }

	let disabled = true;
	let input: string = '';
	$: disabled = !input;

	// export let form: ActionData;

	// if (form?.success && form?.chain?.id) {
	// 	// goto(`/chain/${form.chain.id}/join`);
	//     window.location.href = `/chain/${form.chain.id}/join`;
	// }

	// onMount(async () => {
	// chainId = await createChain();
	// goto(`/chain/${chainId}`);
	// });
</script>

<!-- {#await $chain as chain} -->
{#if chain}
	<div class="my-5 w-100">
		<span class="text-sm text-gray-500"> Welcome to </span>
		<h1>{chain.name}</h1>
		<div class="mt-5">
			<form method="POST" action="?/join">
				<input type="hidden" name="chainId" value={chain.id} />
				<TextInput
					labelText="Your username"
					placeholder="Fluffy coder"
					name="username"
					bind:value={input}
				/>
				<Button type="submit" {disabled}>Set your PIN</Button>
			</form>
		</div>

		<div class="my-5" />

		<!-- <Button on:click={() => goto(`/chain/${params.chainId}`)}>Create a chain</Button> -->
	</div>
{/if}

<!-- {/await} -->
