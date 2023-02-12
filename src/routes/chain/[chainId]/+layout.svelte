<script lang="ts">
	import { Tag } from 'carbon-components-svelte';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
	console.log('/layout', data);
</script>

<div class="my-5 w-100">
	<Tag type="purple">{data?.chain?.name}</Tag>
	<slot />
</div>
