<script lang="ts">

	interface Props {
		onclick?: (event: MouseEvent) => void;
		classes?: string;
		circleRadius?: number;
		fillColor?: string;
		highlightColor?: string;
		strokeWidth?: number;
		styles?: string;
	}

	let {
		classes = '',
		circleRadius = 23,
		fillColor = 'fff',
		highlightColor = '000',
		strokeWidth = 3,
		styles = '',
		onclick
	}: Props = $props();

</script>

<svg
		class="{classes}"
		height="50"
		{onclick}
		style="{styles}"
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
				x1="16"
				x2="29"
				y1="27"
				y2="14"
		/>
		<line
				stroke="#{highlightColor}"
				stroke-width="5"
				x1="29"
				x2="16"
				y1="37"
				y2="24"
		/>
	</g>
</svg>
