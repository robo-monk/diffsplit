<script lang="ts">
	import { goto } from '$app/navigation';
	import { Tag } from 'carbon-components-svelte';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
	console.log('/layout', data);
</script>

<div class="my-5 w-100">
	<Tag class="cursor-pointer" type="purple" role="button" on:click={() => goto(`/chain/${data.chain.id}`)}
		>{data?.chain?.name}</Tag
	>
	<slot />
</div>
