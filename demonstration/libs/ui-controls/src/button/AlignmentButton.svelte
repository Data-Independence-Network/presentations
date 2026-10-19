<script lang="ts">
	interface Props {
		onclick?: (event: MouseEvent) => void;
		alignmentMode?: boolean;
	}

	let { alignmentMode, onclick }: Props = $props();
</script>

<svg height="50" width="50" {onclick}>
	<g>
		<circle
			cx="25"
			cy="25"
			fill="#fff"
			r="23"
			stroke="#000"
			stroke-width="3"
		/>
		{#if !alignmentMode}
			<line
				stroke="#000000"
				stroke-width="3"
				stroke-linecap="round"
				x1="25"
				x2="25"
				y1="10"
				y2="40"
			/>
			<line
				stroke-linecap="round"
				stroke-width="3"
				stroke="#000"
				x1="10"
				x2="40"
				y1="25"
				y2="25"
			/>

			<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="3"
				x1="36"
				x2="40"
				y1="21"
				y2="25"
			/>
			<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="3"
				x1="36"
				x2="40"
				y1="29"
				y2="25"
			/>

			<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="3"
				x1="14"
				x2="10"
				y1="21"
				y2="25"
			/>
			<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="3"
				x1="14"
				x2="10"
				y1="29"
				y2="25"
			/>

			<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="3"
				x1="25"
				x2="21"
				y1="10"
				y2="14"
			/>
			<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="3"
				x1="25"
				x2="29"
				y1="10"
				y2="14"
			/>

			<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="3"
				x1="25"
				x2="21"
				y1="40"
				y2="36"
			/>
			<line
				stroke="#000"
				stroke-linecap="round"
				stroke-width="3"
				x1="25"
				x2="29"
				y1="40"
				y2="36"
			/>
		{/if}
	</g>
</svg>
