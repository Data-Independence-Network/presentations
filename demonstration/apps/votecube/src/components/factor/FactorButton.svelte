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
				x1="12"
				x2="12"
				y1="16"
				y2="32"
		/>
		<line
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="25"
				x2="25"
				y1="23"
				y2="41"
		/>
		<line
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="38"
				x2="38"
				y1="16"
				y2="32"
		/>

		<line
				fill="none"
				stroke="#000"
				stroke-width="4"
				stroke-linecap="round"
				x1="12"
				x2="25"
				y1="32"
				y2="41"
		/>
		<line
				fill="none"
				stroke="#000"
				stroke-width="4"
				stroke-linecap="round"
				x1="12"
				x2="25"
				y1="16"
				y2="23"
		/>

		<line
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="38"
				x2="25"
				y1="32"
				y2="41"
		/>
		<line
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="38"
				x2="25"
				y1="16"
				y2="23"
		/>


		<line
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="38"
				x2="25"
				y1="16"
				y2="10"
		/>
		<line
				fill="none"
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="12"
				x2="25"
				y1="16"
				y2="10"
		/>
	</g>
</svg>