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
	<polygon
			cx="15.1"
			cy="16.73333"
			fill="none"
			orient="point"
			points="24.999990463256836,10.563307382166386 28.5882625579834,20.657106019556522 39.51482391357422,20.87482414394617 30.80592918395996,27.330855943262577 33.97064971923828,37.55920944362879 24.999990463256836,31.455474473536015 16.029333114624023,37.55920944362879 19.19405174255371,27.330855943262577 10.485158920288086,20.87482414394617 21.411733627319336,20.657106019556522 24.999990463256836,10.563307382166386 28.5882625579834,20.657106019556522 "
			r="182.97003"
			stroke="black"
			stroke-width="3"
	/>
</svg>
<!-- Credits for star icon:
	https://svg-edit.github.io/
	-->
