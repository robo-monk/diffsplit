<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import type { LayoutData } from '../$types';
	export let data: LayoutData;
	let chain = data.chain;
</script>

<div class="my-5 w-100">
	<span class="text-sm text-gray-500"> Invite to </span>
	<h1>{chain.name}</h1>
	<div class="mt-5">
		<form method="POST" action="?/join">
			<input type="hidden" name="chainId" value={chain.id} />
			<Button type="submit" href="/chain/{chain.id}">Next</Button>
		</form>
	</div>

	<div class="my-5" />

	<!-- <Button on:click={() => goto(`/chain/${params.chainId}`)}>Create a chain</Button> -->
</div>
