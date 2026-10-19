<script lang="ts">
	interface Props {
		onclick?: (event: MouseEvent) => void;
		classes?: string;
		styles?: string;
	}

	let { classes = '', styles = '', onclick }: Props = $props();
</script>

<svg
		class="{classes}"
		height="50"
		{onclick}
		style="{styles}"
		width="50"
>
	<g>
		<circle
				cx="25"
				cy="25"
				fill="#FFF"
				r="23"
				stroke-width="3"
				stroke="#000"
		/>

		<rect
				fill="#000"
				height="19"
				stroke="#000"
				stroke-width="7"
				stroke-linejoin="round"
				width="12"
				x="7"
				y="15"
		/>
		<rect
				fill="#000"
				height="19"
				stroke="#000"
				stroke-width="7"
				stroke-linejoin="round"
				width="12"
				x="31"
				y="15"
		/>

		<line
				stroke="#000"
				stroke-width="2"
				x1="9"
				x2="20"
				y1="35"
				y2="45"
		/>
		<line
				stroke="#000"
				stroke-width="2"
				x1="41"
				x2="30"
				y1="35"
				y2="45"
		/>

		<line
				stroke="#fff"
				stroke-width="5"
				x1="10"
				x2="16"
				y1="31.5"
				y2="36.5"
		/>
		<line
				stroke="#fff"
				stroke-width="5"
				x1="40"
				x2="34"
				y1="31.5"
				y2="36.5"
		/>


		<line
				stroke="#fff"
				stroke-width="3"
				x1="14.5"
				x2="17"
				y1="32"
				y2="39"
		/>
		<line
				stroke="#fff"
				stroke-width="3"
				x1="35.5"
				x2="33"
				y1="32"
				y2="39"
		/>

		<line
				stroke="#000"
				stroke-width="2"
				x1="17.5"
				x2="20"
				y1="35"
				y2="45"
		/>
		<line
				stroke="#000"
				stroke-width="2"
				x1="32.5"
				x2="30"
				y1="35"
				y2="45"
		/>

		<rect
				fill="#FFF"
				height="15"
				stroke="#FFF"
				stroke-linejoin="round"
				stroke-width="7"
				width="10.5"
				x="7"
				y="17"
		/>
		<rect
				fill="#FFF"
				height="15"
				stroke="#FFF"
				stroke-linejoin="round"
				stroke-width="7"
				width="10.5"
				x="32.5"
				y="17"
		/>

		<circle
				cy="25"
				cx="25"
				fill="none"
				r="23"
				stroke="#000"
				stroke-width="3"
		/>
	</g>
</svg>