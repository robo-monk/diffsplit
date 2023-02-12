<script lang="ts">
	import { Button, Tag } from 'carbon-components-svelte';
    export let amount: number;
    export let currency: string = '€';
</script>

<h1>{amount} {currency}</h1>
