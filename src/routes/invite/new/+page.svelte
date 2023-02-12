<script lang='ts'>
	import Invite from "../Invite.svelte";

	let url: string = "https://www.npmjs.com/package/qrcode#usage";
    
    $: console.log({ url })
</script>


<div>
    <h4> Invite to </h4>
    <h1> Obrigado </h1>

    <Invite bind:url/>
</div>
