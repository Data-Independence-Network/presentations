<script lang="ts">
	interface Props {
		onclick?: (event: MouseEvent) => void;
		classes?: string;
	}

	let { classes = '', onclick }: Props = $props();
</script>

<svg
		class="{classes}"
		height="50"
		{onclick}
		width="50"
>
	<g>
		<circle cx="25" cy="25" fill="#fff" stroke="#000" stroke-width="3" r="23"/>
		<line stroke="#000" stroke-width="10" x1="16" x2="37" y1="33.75" y2="13.5"/>
		<line stroke="#000" transform="rotate(43.585575103759766 16.125,33.75) "
		      stroke-width="7" x1="18.76757" x2="13.48243" y1="36.29285" y2="31.20715"/>
		<line stroke="#fff" y2="22" x2="35.875" y1="14.5" x1="28.625" stroke-width="2"
		      fill="none"/>
	</g>
</svg>