<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<style>
	/*	div {
			position: absolute;
			top: 0px;
			right: -2px;
		}*/

	div {
		border: 3px solid black;
		border-radius: 25px;
		height: 50px;
		width: 49px;
	}

	/*	section {
			position: relative;
		}*/
</style>
<!--<section>-->
<div
		class="upClose"
>
	{@render children?.()}
</div>
<!--</section>-->