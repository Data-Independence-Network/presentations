<script lang="ts">

	interface Props {
		onclick?: (event: MouseEvent) => void;
		classes?: string;
		circleRadius?: number;
		fillColor?: string;
		highlightColor?: string;
		strokeWidth?: number;
	}

	let {
		classes = '',
		circleRadius = 23,
		fillColor = 'fff',
		highlightColor = '000',
		strokeWidth = 3,
		onclick
	}: Props = $props();

</script>

<style>
	.switchPosition {
		position: absolute;
	}
</style>

<svg
		class="{classes}"
		height="50"
		{onclick}
		width="50"
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
				x1="9"
				x2="22"
				y1="27"
				y2="14"
		/>
		<line
				stroke="#{highlightColor}"
				stroke-width="5"
				x1="22"
				x2="9"
				y1="37"
				y2="24"
		/>
		<line
				stroke="#{highlightColor}"
				stroke-width="5"
				x1="27"
				x2="41"
				y1="13"
				y2="27"
		/>
		<line
				stroke="#{highlightColor}"
				stroke-width="5"
				x1="27"
				x2="41"
				y1="37"
				y2="24"
		/>
	</g>
</svg>
