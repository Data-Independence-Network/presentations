<script lang="ts">
	import { isDesktop, popup } from '@votecube/ui-logic'
	import { onMount, type Snippet } from 'svelte'
	import { fade } from 'svelte/transition'

	interface Props {
		desktopWidth?: string;
		height?: string;
		maxWidth?: string | null;
		width?: string | number | null;
		content?: Snippet;
	}

	let {
		desktopWidth = "34%",
		height = 'initial',
		maxWidth = null,
		width = null,
		content
	}: Props = $props();

	let theWidth = $derived($isDesktop ? desktopWidth : (width ? width : '90%'))

	onMount(() => {
		popup.set(true)
		return () => popup.set(false)
	})
</script>

<style>
	aside {
		background-color: rgba(32, 32, 32, 0.7);
		height: 100%;
		left: 0px;
		position: fixed;
		top: 0px;
		width: 100%;
		z-index: 1200;
	}

	div {
		/*position: relative;*/
		width: 100%;
		height: 100%;
	}

	section {
		background-color: #fff;
		border: 1px solid black;
		border-radius: 5px;
		left: 50%;
		margin: 0;
		max-width: 400px;
		padding: 10px;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>

<aside
		transition:fade='{{duration: 100}}'
>
	<div>
		<section
				style="
                height: {height};
                max-width: {maxWidth};
                width: {theWidth};
            "
		>
			{@render content?.()}
		</section>
	</div>
</aside>
