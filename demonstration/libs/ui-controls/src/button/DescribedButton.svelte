<script lang="ts">
	import { untrack, type Snippet } from "svelte";
	interface Props {
		onclick?: (event: MouseEvent) => void;
		displayed?: boolean;
		displayedHandle?: any;
		opened?: boolean;
		label?: string;
		children?: Snippet;
	}

	let {
		displayed = $bindable(false),
		displayedHandle = $bindable(null),
		opened = $bindable(false),
		label = '',
		children,
		onclick
	}: Props = $props();

	let closing = $state(false)
	let openedInternal = $state(false)
	let previousOpened = false

	$effect.pre(() => {
		const isOpened = opened
		if (isOpened === previousOpened) {
			return
		}
		previousOpened = isOpened

		untrack(() => {
			setTimeout(() => {
				if (!opened) {
					closing = true
					setTimeout(() => {
						closing = false
					}, 201)
				} else {
					closing = false
				}
			}, 1)
			setTimeout(() => {
				openedInternal = opened
			})
			let newDisplayed = isOpened
			if (closing) {
				newDisplayed = false
			}
			if (newDisplayed) {
				displayedHandle = setTimeout(() => {
					displayed = newDisplayed
				}, 2500)
			} else {
				if (displayedHandle) {
					clearTimeout(displayedHandle)
					displayedHandle = 0
				}
				displayed = newDisplayed
			}
		})
	})

</script>

<style>
	div {
		position: absolute;
		right: 0px;
		top: 0px;
	}

	div:first-child.opened {
		width: 250px;
	}

	div:first-child {
		background-color: #808080;
		border: 3px solid black;
		height: 50px;
		transition: width 0.5s;
		transition-delay: 2s;
		width: 50px;
	}

	div.closing:first-child {
		transition: width 200ms;
		transition-delay: 0s;
	}

	div:first-child,
	span {
		border-radius: 25px;
	}

	span {
		color: white;
		display: inline-block;
		font-size: 1.2em;
		font-weight: 300;
		height: 100%;
		line-height: 42px;
		padding-left: 15px;
		vertical-align: middle;
		width: 100%;
	}

	section {
		position: relative;
	}
</style>

<section
		{onclick}
>
	<div
			class="upClose"
			class:closing="{closing}"
			class:opened="{openedInternal}"
	>
		{#if displayed}
		<span>
		{label}
		</span>
		{/if}
	</div>
	<div>
		{@render children?.()}
	</div>
</section>
