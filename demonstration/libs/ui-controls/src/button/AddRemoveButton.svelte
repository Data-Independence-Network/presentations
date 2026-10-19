<script lang="ts">
	import { fade } from 'svelte/transition'

	interface Props {
		onselect?: () => void;
		add?: boolean;
		classes?: string;
		circleRadius?: number;
		fillColor?: string;
		highlightColor?: string;
		reversible?: boolean;
		reversed?: boolean;
		strokeWidth?: number;
		styles?: string;
		size?: number;
	}

	let {
		add = true,
		classes = '',
		circleRadius = 23,
		fillColor = 'fff',
		highlightColor = '000',
		reversible = false,
		reversed = $bindable(false),
		strokeWidth = 3,
		styles = '',
		size = 50,
		onselect
	}: Props = $props();

	function viewBox(size) {
		return size === 50 ? '' : '0 0 50 50'
	}

	function press(
		reversible,
		newReversed
	) {
		if (reversible) {
			reversed = newReversed
		}
		onselect?.()
	}
</script>

<style>
	svg {
		border-radius: 100px;
		-webkit-transition: .4s;
		transition: .4s;
	}

	svg.reversed {
		transform: rotate(180deg);
	}
</style>

<svg
		class="{classes} {reversed ? 'reversed' : ''}"
		height="{size}"
		onclick={() => press(reversible, reversed)}
		style="{styles}"
		viewBox="{viewBox(size)}"
		width="{size}"
>
	<g class="layer">
		<circle
				cx="25"
				cy="25"
				fill="#{fillColor}"
				r="{circleRadius}"
				stroke="#{highlightColor}"
				stroke-width="{strokeWidth}"
		/>
		<line
				stroke="#{highlightColor}"
				stroke-width="5"
				x1="14"
				x2="36"
				y1="25"
				y2="25"
		/>
		{#if add}
		{#if reversible}
		<line
				stroke="#{highlightColor}"
				stroke-width="5"
				transition:fade
				x1="25"
				x2="25"
				y1="14"
				y2="36"
		/>
		{:else}
		<line
				stroke="#{highlightColor}"
				stroke-width="5"
				x1="25"
				x2="25"
				y1="14"
				y2="36"
		/>
		{/if}
		{/if}
	</g>
</svg>
