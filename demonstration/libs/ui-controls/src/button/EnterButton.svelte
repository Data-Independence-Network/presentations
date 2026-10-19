<script lang="ts">
	interface Props {
		onclick?: (event: MouseEvent) => void;
	}

	let { onclick }: Props = $props();
</script>

<svg
		height="50"
		{onclick}
		width="50"
>
	<g>
		<circle
				cx="25"
				cy="25"
				fill="#fff"
				r="23"
				stroke="#000"
				stroke-width="3"
		/>
		<line
				stroke="#000000"
				stroke-width="25"
				x1="15"
				x2="34"
				y1="35"
				y2="16"
		/>
		<rect
				height="1"
				stroke="#ffffff"
				stroke-width="8"
				width="32"
				x="9"
				y="27"
		/>
		<rect
				height="1"
				stroke="#ffffff"
				stroke-width="8"
				width="19"
				x="16"
				y="35"
		/>
		<rect
				height="1"
				stroke="#ffffff"
				stroke-width="8"
				width="2"
				x="24"
				y="40"
		/>
		<rect
				height="7"
				stroke="#000000"
				stroke-width="10"
				width="7"
				x="22"
				y="28"
		/>
	</g>
</svg>