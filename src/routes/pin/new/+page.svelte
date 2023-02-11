<script lang='ts'>
	import Pin from "../Pin.svelte";
    let password: string = "";
    
    $: console.log({ password })
</script>


<div>
    <h4> Set your </h4>
    <h1> PIN </h1>

    <Pin bind:password />
</div>
