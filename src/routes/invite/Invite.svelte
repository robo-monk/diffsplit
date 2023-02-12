<script lang='ts'>
	import { Button } from 'carbon-components-svelte';
	import Add from "carbon-icons-svelte/lib/Add.svelte";
	import Link from "carbon-icons-svelte/lib/Link.svelte";
	import Share from "carbon-icons-svelte/lib/Share.svelte";
	import ArrowRight from "carbon-icons-svelte/lib/ArrowRight.svelte";





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

	async function shareURL() {
		const shareData = {
			title: 'Invitation to join Diffsplit room',
			text: "Your friend is inviting you to join Diffsplit",
			url: url
		}

		try {
			await navigator.share(shareData);
			console.log("Shared url data to navigator")
		} catch (err) {
			console.log("Did not share url data. Error:" + err)
		}
	}

	generateQR(url)

</script>

<div class="flex items-center flex-col max-w-lg">

	<div class="qrcode">
		<!-- svelte-ignore a11y-missing-attribute -->
		<img src='' bind:this={qrimage}>
	</div>
	
	<div class="flex flex-col w-3/5">
		<Button class="my-5 relative" on:click={copyURL}>
			<span>Copy URL</span>
			<Link class="absolute right-5"/>
		</Button>
		<Button kind="secondary" on:click={shareURL}>
			<span>Share URL</span>
			<Share class="absolute right-5"/>
		</Button>
		<Button class="mt-20 relative" on:click={copyURL}>
			<span>Continue</span>
			<ArrowRight class="absolute right-5"/>
		</Button>
	</div>

</div>


