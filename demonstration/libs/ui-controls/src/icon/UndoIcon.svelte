<script lang="ts">

	interface Props {
		multiLine?: boolean;
		onclick?: (event: MouseEvent) => void;
	}

	let { multiLine = false, onclick }: Props = $props();

	function handleClick(event: MouseEvent) {
		event.stopPropagation()
		onclick?.(event)
	}

</script>

<i
		class:fieldAid="{!multiLine}"
		style="
        vertical-align: top;
    "
		onclick={handleClick}
>
	<svg
			height="33"
			width="33"
	>
		<g>
			<circle r="10" stroke-width="3" stroke="#aaa" fill="#fff" cy="16.5" cx="16.5"/>
			<rect transform="rotate(-47 4.27,16.25) " height="16" width="16" y="8" x="-4"
			      fill="#fff"/>
			<path d="m5.32,14.36l0,-8.35556l8.35556,8.35556l-8.35556,0z" fill="#aaa"/>
		</g>
	</svg>
</i>
