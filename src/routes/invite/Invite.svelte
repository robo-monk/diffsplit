<script lang='ts'>
	import { Button } from 'carbon-components-svelte';

	import QRCode from 'qrcode'

	export let url: string = ''

	let qrimage: HTMLImageElement;


	const generateQR = async (url: string) => {
		try {
			let qrurl = await QRCode.toDataURL(url) 
			console.log(qrurl)

			qrimage.src = qrurl
			return qrurl
		} catch (err) {
			console.error(err)
		}
	}

	async function copyURL(){

		try {
			if (!navigator.clipboard) {
				throw new Error("Browser don't have support for native clipboard.");
			}

			await navigator.clipboard.writeText(url);
			console.log("Copied URL: " + url);
		} catch (error) {
			console.log("Could not copy, clipboard issue");
			}
		return url
	}

	generateQR(url)

</script>

<div class="flex items-center flex-col max-w-lg mx-auto">

	<div class="qrcode">
		<!-- svelte-ignore a11y-missing-attribute -->
		<img src='' bind:this={qrimage}>
	</div>
	
	<div class="flex flex-col">
		<Button class="my-5" on:click={copyURL}>Copy URL</Button>
		<Button kind="secondary">Share</Button>
	</div>

</div>


