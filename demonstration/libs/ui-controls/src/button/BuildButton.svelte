<script lang="ts">
	interface Props {
		onclick?: (event: MouseEvent) => void;
		classes?: string;
		highlightColor?: string;
	}

	let { classes = '', highlightColor = '0b0', onclick }: Props = $props();
</script>

<style>
	svg {
		transform: rotate(45deg);
	}
</style>

<svg
		class="{classes}"
		height="50"
		{onclick}
		width="50"
>
	<g>
		<circle
				cx="25"
				cy="25"
				fill="#FFF"
				r="23"
				stroke="#{highlightColor}"
				stroke-width="3"
		/>
		<polygon
				fill="#{highlightColor}"
				points="36,9 33,12 31,10 18,10 11,17 11,19 31,19, 33,17 36,20 37,20 37,9"
		></polygon>
		<line
				stroke="#{highlightColor}"
				stroke-width="8"
				x1="25"
				x2="25"
				y1="7"
				y2="44"
		></line>
	</g>
</svg>
