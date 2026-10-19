<script lang="ts">
	interface Props {
		onclick?: (event: MouseEvent) => void;
		classes?: string;
		highlightColor?: string;
	}

	let { classes, highlightColor, onclick }: Props = $props();
</script>

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
				fill="none"
				r="23"
				stroke="#{highlightColor}"
				stroke-width="3"
		></circle>
		<circle
				cx="28"
				cy="21"
				fill="none"
				r="13"
				stroke="#{highlightColor}"
				stroke-width="3"
		></circle>
		<line
				stroke="#{highlightColor}"
				stroke-width="6"
				x1="13"
				x2="21"
				y1="40"
				y2="30"
		></line>
	</g>
</svg>
