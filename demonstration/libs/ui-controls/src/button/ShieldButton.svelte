<script lang="ts">

	interface Props {
		styles?: string;
		viewBox?: string;
	}

	let { styles = '', viewBox = '0 0 50 50' }: Props = $props();

</script>

<svg
		height="50"
		style="{styles}"
		viewBox="{viewBox}"
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
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="25"
				x2="12"
				y1="12"
				y2="15"
		/>
		<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="25"
				x2="38"
				y1="12"
				y2="15"
		/>
		<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="12"
				x2="15"
				y1="15"
				y2="32"
		/>
		<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="38"
				x2="35"
				y1="15"
				y2="32"
		/>
		<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="15"
				x2="25"
				y1="32"
				y2="40"
		/>
		<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="35"
				x2="25"
				y1="32"
				y2="40"
		/>
	</g>
</svg>
