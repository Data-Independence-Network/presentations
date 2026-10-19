<script lang="ts">
	interface Props {
		onclick?: (event: MouseEvent) => void;
		character: any;
		classes?: string;
		fillColor?: string;
		fontSize?: number;
		fontX?: number;
		fontY?: number;
		highlightColor?: string;
		size?: number;
		strokeWidth?: number;
		styles?: string;
	}

	let {
		character,
		classes = "",
		fillColor = "fff",
		fontSize = 45,
		fontX = 25,
		fontY = 42,
		highlightColor = "000",
		size = 50,
		strokeWidth = 3,
		styles = "",
		onclick
	}: Props = $props();
</script>

<svg class={classes} height={size} style={styles} {onclick} width={size}>
	<g class="layer">
		<circle
			cx={size / 2}
			cy={size / 2}
			fill="#{fillColor}"
			r={size / 2 - 2}
			stroke="#{highlightColor}"
			stroke-width={strokeWidth}
		/>
		<text
			fill="#000"
			font-family="Dosis"
			font-size={fontSize}
			font-weight="bold"
			stroke-width="0"
			stroke="#000"
			text-anchor="middle"
			x={fontX}
			y={fontY}
		>
			{character}
		</text>
	</g>
</svg>
