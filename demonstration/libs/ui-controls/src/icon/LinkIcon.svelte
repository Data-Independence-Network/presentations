<script lang="ts">

	interface Props {
		styles?: string;
	}

	let { styles = '' }: Props = $props();

</script>

<svg
		height="17"
		style="{styles}"
		width="40"
>
	<g>
		<rect
				fill="none"
				height="11"
				rx="5"
				ry="5"
				stroke="#808080"
				stroke-width="4"
				width="15"
				x="2"
				y="4"
		/>
		<rect
				fill="none"
				height="11"
				rx="5"
				ry="5"
				stroke="#808080"
				stroke-width="4"
				width="15"
				x="23"
				y="4"
		/>
		<line
				fill="none"
				stroke="#808080"
				stroke-linecap="round"
				stroke-width="4"
				x1="13"
				x2="27"
				y1="9.5"
				y2="9.5"
		/>
	</g>
</svg>
