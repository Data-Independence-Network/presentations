<script lang="ts">
	import type { Snippet } from 'svelte';
	import { popup } from "@votecube/ui-logic";
	import { untrack } from "svelte";
	import AddRemoveButton from "@votecube/ui-controls/src/button/AddRemoveButton.svelte";

	interface Props {
		opened?: boolean;
		up1?: Snippet;
		up2?: Snippet;
		up3?: Snippet;
		up4?: Snippet;
		up5?: Snippet;
		left1?: Snippet;
		left2?: Snippet;
		left3?: Snippet;
		left4?: Snippet;
	}

	let {
		opened = $bindable(false),
		up1,
		up2,
		up3,
		up4,
		up5,
		left1,
		left2,
		left3,
		left4
	}: Props = $props();

	let openState = $state(0);
	let previousOpened: boolean | undefined;

	$effect.pre(() => {
		const isOpened = opened;
		if (isOpened === previousOpened) {
			return;
		}
		previousOpened = isOpened;
		if (!isOpened) {
			untrack(() => toggle(true));
		}
	});

	function toggle(oldOpened) {
		if (oldOpened === undefined) {
			oldOpened = opened;
		}
		opened = !oldOpened;

		if (opened) {
			openState = 1;
			setTimeout(() => {
				openState = 2;
			}, 10);
		} else {
			openState = 3;
			setTimeout(() => {
				openState = 0;
			}, 260);
		}
	}
	let visibility = $derived.by(() => {
		switch (openState) {
			case 0:
				return "hidden";
			case 1:
				return "closed";
			case 2:
				return "open";
			case 3:
				return "closed closing";
		}
		return "";
	});
</script>

<aside class:hidden={$popup}>
	<menu class="verticalButtons">
		<!--		<slot name="vertical"></slot>-->
		<nav class="{visibility} fabNav" id="fabNav_up1">
			{@render up1?.()}
		</nav>
		<nav class="{visibility} fabNav" id="fabNav_up2">
			{@render up2?.()}
		</nav>
		<nav class="{visibility} fabNav" id="fabNav_up3">
			{@render up3?.()}
		</nav>
		<nav class="{visibility} fabNav" id="fabNav_up4">
			{@render up4?.()}
		</nav>
		<nav class="{visibility} fabNav" id="fabNav_up5">
			{@render up5?.()}
		</nav>
	</menu>
	<menu class="horizontalButtons">
		<nav class="{visibility} fabNav" id="fabNav_left1">
			{@render left1?.()}
		</nav>
		<nav class="{visibility} fabNav" id="fabNav_left2">
			{@render left2?.()}
		</nav>
		<nav class="{visibility} fabNav" id="fabNav_left3">
			{@render left3?.()}
		</nav>
		<nav class="{visibility} fabNav" id="fabNav_left4">
			{@render left4?.()}
		</nav>
	</menu>
	<nav class="fab" onclick={() => toggle(opened)}>
		<span>
			<div class="farAway">
				<AddRemoveButton
					add={!opened}
					reversible={true}
					size={35}
					styles="bottom: 3px; position: absolute; right: 1.5px;"
				/>
			</div>
		</span>
	</nav>
</aside>

<style>
	aside {
		bottom: 5px;
		height: 1px;
		max-width: 420px;
		position: fixed;
		width: 100%;
		z-index: 2000;
	}

	aside.hidden {
		display: none;
	}

	div.farAway {
		border: 2px solid black;
		border-radius: 25px;
		height: 32px;
		width: 32px;
	}

	nav {
		align-items: center;
		display: flex;
		height: 65px;
		justify-content: center;
		position: relative;
		width: 65px;
	}

	nav.closed {
		opacity: 0;
	}

	nav.hidden {
		display: none;
	}

	nav.fab {
		border-radius: 34px;
		bottom: -2px;
		height: 69px;
		position: absolute;
		padding: 17px;
		right: -1px;
		width: 69px;
	}

	nav[id$="1"] {
		transition-duration: 250ms;
		transition-delay: 50ms;
	}

	nav[id$="1"].closing {
		transition-delay: 150ms;
	}

	nav[id$="2"] {
		transition-duration: 250ms;
		transition-delay: 80ms;
	}

	nav[id$="2"].closing {
		transition-delay: 120ms;
	}

	nav[id$="3"] {
		transition-duration: 250ms;
		transition-delay: 110ms;
	}

	nav[id$="3"].closing {
		transition-delay: 90ms;
	}

	nav[id$="4"] {
		transition-duration: 200ms;
		transition-delay: 140ms;
	}

	nav[id$="4"].closing {
		transition-delay: 60ms;
	}

	nav[id$="5"] {
		transition-duration: 150ms;
		transition-delay: 170ms;
	}

	nav[id$="5"].closing {
		transition-delay: 30ms;
	}

	/*nav.closed {*/
	/*	display: none;*/
	/*}*/

	nav.open {
		opacity: 1;
	}

	/*nav {*/
	/*	position: relative;*/
	/*}*/

	menu {
		margin: 0px;
		position: absolute;
		z-index: 3;
	}

	span {
		display: block;
		height: 100%;
		position: relative;
		width: 100%;
	}

	/* https://davidwalsh.name/css-reverse */
	.horizontalButtons {
		bottom: 0px;
		display: flex;
		flex-direction: row-reverse;
		right: 60px;
	}

	/* show reverse by vertical column */
	.verticalButtons {
		bottom: 60px;
		display: flex;
		flex-direction: column-reverse;
		right: 0px;
	}
</style>
