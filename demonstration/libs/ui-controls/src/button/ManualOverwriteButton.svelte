<script lang="ts">
	interface Props {
		onclick?: (event: MouseEvent) => void;
	}

	let { onclick }: Props = $props();
</script>

<svg height="50" width="50" {onclick}>
	<g>
		<circle
			cx="25"
			cy="25"
			fill="#FFF"
			r="23"
			stroke="#000"
			stroke-width="3"
		/>
		<circle
			cx="15"
			cy="15"
			fill="#000"
			r="2"
			stroke="#000"
			stroke-width="4"
		/>
		<circle
			cx="35"
			cy="15"
			fill="#000"
			r="2"
			stroke="#000"
			stroke-width="4"
		/>
		<circle
			cx="15"
			cy="25"
			fill="#000"
			r="2"
			stroke="#000"
			stroke-width="4"
		/>
		<circle
			cx="35"
			cy="25"
			fill="#000"
			r="2"
			stroke="#000"
			stroke-width="4"
		/>
		<circle
			cx="15"
			cy="35"
			fill="#000"
			r="2"
			stroke="#000"
			stroke-width="4"
		/>
		<circle
			cx="35"
			cy="35"
			fill="#000"
			r="2"
			stroke="#000"
			stroke-width="4"
		/>
		<line stroke="#000" stroke-width="2" x1="18" x2="32" y1="15" y2="15" />
		<line stroke="#000" stroke-width="2" x1="18" x2="32" y1="25" y2="25" />
		<line stroke="#000" stroke-width="2" x1="18" x2="32" y1="35" y2="35" />
		<line stroke="#000" stroke-width="2" x1="25" x2="25" y1="15" y2="35" />
	</g>
</svg>
