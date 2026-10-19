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
				fill="#fff"
				cx="25"
				cy="25"
				r="23"
				stroke="#000"
				stroke-width="3"
		/>
		<rect
				fill="#000"
				height="10"
				stroke="#000"
				stroke-width="3"
				transform="rotate(45 12.5,25)"
				width="10"
				x="8.5"
				y="19.5"
		/>
		<rect
				fill="#000"
				height="10"
				stroke="#000"
				stroke-width="3"
				transform="rotate(45 37.5,25)"
				width="10"
				x="32"
				y="21"
		/>
		<rect
				fill="#FFF"
				height="18"
				stroke="#FFF"
				stroke-width="3"
				width="21"
				x="14.5"
				y="15"
		/>
		<rect
				fill="none"
				height="28"
				stroke="#000"
				stroke-width="3"
				width="16"
				x="17"
				y="11"
		/>
		<rect
				fill="#FFF"
				height="11"
				stroke="#FFF"
				stroke-width="3"
				width="10"
				x="16"
				y="20"
		/>
		<rect
				fill="#FFF"
				height="11"
				stroke="#FFF"
				stroke-width="3"
				width="10"
				x="25"
				y="20"
		/>

		<line
				stroke="#000"
				stroke-width="9"
				x1="11"
				x2="21"
				y1="25.5"
				y2="25.5"
		/>

		<line
				stroke="#000"
				stroke-width="9"
				x1="29"
				x2="39"
				y1="25.5"
				y2="25.5"
		/>
	</g>
</svg>
