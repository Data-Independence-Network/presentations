<script lang="ts">

	interface Props {
		onclick?: (event: MouseEvent) => void;
		classes?: string;
		circleRadius?: number;
		fillColor?: string;
		highlightColor?: string;
		size?: number;
		strokeWidth?: number;
		styles?: string;
	}

	let {
		classes = '',
		circleRadius = 23,
		fillColor = 'fff',
		highlightColor = '000',
		size = 50,
		strokeWidth = 3,
		styles = '',
		onclick
	}: Props = $props();

	let viewBox = $derived(size === 50 ? '' : '0 0 50 50')

</script>

<svg
		class="{classes}"
		height="{size}"
		{onclick}
		style="{styles}"
		viewBox="{viewBox}"
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
				x1="20"
				x2="34"
				y1="13"
				y2="27"
		/>
		<line
				stroke="#{highlightColor}"
				stroke-width="5"
				x1="20"
				x2="34"
				y1="37"
				y2="24"
		/>
	</g>
</svg>
