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
		height="50px"
		{onclick}
		style="{styles}"
		width="50px"
>
	<circle
			cx="25"
			cy="25"
			fill="#FFF"
			r="23"
			stroke="#000"
			stroke-width="3"
	/>
	<path
			d="m4.7,31.3c10.15,0 10.15,-15.8 20.3,-15.8c10.15,0 10.15,15.8 20.3,15.8"
			fill="none"
			stroke="black"
			stroke-dasharray="2"
			stroke-width="2"
	/>
	<path
			d="m7.70523,39.70513c8.65077,0 8.65077,-34.30024 17.30154,-34.30024c8.65077,0 8.65077,34.30024 17.30154,34.30024"
			fill="none" id="svg_3"
			transform="rotate(0.13630852103233337 25.006769180300644,22.555009841918924) "
			stroke="black"
			stroke-width="2"
	/>
</svg>
<!-- Credits for the algorithm:
	https://stackoverflow.com/questions/39485232/svg-draw-dashed-bell-curve-between-2-points
	-->
