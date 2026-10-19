<script lang="ts">

	interface Props {
		onclick?: (event: MouseEvent) => void;
		viewBox?: string;
	}

	let { viewBox, onclick }: Props = $props();

</script>

<svg
		{onclick}
		height="50"
		width="50"
		viewBox="{viewBox}"
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
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="10"
				x2="40"
				y1="15"
				y2="15"
		/>
		<line
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="14"
				x2="36"
				y1="23"
				y2="23"
		/>
		<line
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="18"
				x2="32"
				y1="31"
				y2="31"
		/>

		<line
				fill="none"
				stroke="#FFF"
				stroke-width="12"
				x1="25"
				x2="25"
				y1="12"
				y2="39"
		/>
		<line
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="25"
				x2="25"
				y1="12"
				y2="42"
		/>
		<line
				fill="none"
				stroke="#000"
				stroke-width="4"
				stroke-linecap="round"
				x1="20"
				y1="37"
				x2="25"
				y2="42"
		/>
		<line
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="30"
				x2="25"
				y1="37"
				y2="42"
		/>
	</g>
</svg>