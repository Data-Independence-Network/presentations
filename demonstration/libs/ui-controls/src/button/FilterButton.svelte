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
				x1="9"
				x2="41"
				y1="19"
				y2="19"
		/>
		<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="9"
				x2="20"
				y1="19"
				y2="30"
		/>
		<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="41"
				x2="30"
				y1="19"
				y2="30"
		/>

		<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="20"
				x2="20"
				y1="30"
				y2="40"
		/>
		<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="30"
				x2="30"
				y1="30"
				y2="40"
		/>


		<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="4"
				x1="20"
				x2="30"
				y1="40"
				y2="40"
		/>
	</g>
</svg>
