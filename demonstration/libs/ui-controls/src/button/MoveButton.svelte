<script lang="ts">
	interface Props {
		onselect?: (event: Event) => void;
		onselectStart?: (event: Event) => void;
		classes?: string;
		highlightColor?: string;
		// export let strokeWidth = 3
		size?: number;
		styles?: string;
	}

	let {
		classes = '',
		highlightColor = 'B0B0B0',
		size = 20,
		styles = '',
		onselect,
		onselectStart
	}: Props = $props();

	let viewBox = $derived(size === 20 ? '' : '0 0 30 30')
</script>

<style>
	svg.right {
		transform: rotate(180deg);
	}

	svg.up {
		transform: rotate(-90deg);
	}
</style>

<svg
		class="{classes}"
		height="{size}"
		onclick={onselect}
		onmousedown={onselectStart}
		ontouchend={onselect}
		ontouchstart={onselectStart}
		style="{styles}"
		viewBox="{viewBox}"
		width="{size}"
>
	<g class="layer">
		<line
				stroke="#{highlightColor}"
				stroke-width="4"
				x1="11"
				x2="19"
				y1="0"
				y2="11"
		/>
		<line
				stroke="#{highlightColor}"
				stroke-width="4"
				x1="1"
				x2="9"
				y1="0"
				y2="11"
		/>
		<line
				stroke="#{highlightColor}"
				stroke-width="4"
				x1="11"
				x2="19"
				y1="20"
				y2="9"
		/>
		<line
				stroke="#{highlightColor}"
				stroke-width="4"
				x1="1"
				x2="9"
				y1="20"
				y2="9"
		/>
	</g>
</svg>
