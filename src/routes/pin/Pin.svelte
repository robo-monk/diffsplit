<script lang="ts">
	import { Button } from 'carbon-components-svelte';

	const PIN_LEN = 4;

	let numbers = [1,2,3,4,5,6,7,8,9,-1 ,0, -1]
	let pass: number[] = []

	export let password: string;

	$:password = pass.join('')
	
	// $: currentPasswordLength = pass.length;

	function numkeyPress(n: number){
		if (pass.length == PIN_LEN ) return

		pass = [ ...pass, n];

		console.log(pass)
		console.log(password)
	}

	
</script>

<div class="flex items-center flex-col max-w-lg mx-auto">
	<div class="pin-dots flex flex-row my-10">
		<!-- {#each Array(pass.length) as n, i}
			<div class='pindot dot{i} w-5 h-5 bg-gray-500 rounded-full mx-2 '></div>
		{/each}
		{#each Array(PIN_LEN - pass.length) as n, i}
			<div class='pindot dot{i} w-5 h-5 bg-gray-800 rounded-full mx-2'></div>
		{/each} -->
		<!-- <div class="bg-gray-400 bg-gray-100"></div> -->
		{#each Array(PIN_LEN) as digit, i}
			<div class='pindot dot-{i} w-5 h-5 bg-{pass.length-1 >= i ? "gray-400" : "gray-800"} rounded-full mx-2'></div>
		{/each}
	</div>

	<div class="numpad w-60 h-50 flex flex-row flex-wrap justify-start">

		{#each numbers as n}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			{#if n != -1}
				<div class="numkey w-20 h-20 text-3xl flex items-center justify-center" 
				on:click={e => numkeyPress(n)}>{n}</div>
			{:else}
				<div class="numkey w-20 h-20 text-3xl flex items-center justify-center opacity-0">{n}</div>
			{/if}
		{/each}
	 </div>
</div>
