<script lang="ts">

	interface Props {
		styles?: string;
	}

	let { styles = '' }: Props = $props();

</script>

<svg
		height="24"
		style="{styles}"
		width="24"
>
	<g>
		<circle
				cx="12"
				cy="12"
				fill="#fff"
				r="10.5"
				stroke="#808080"
				stroke-width="3"
		/>
		<circle
				cx="12"
				cy="12"
				fill="#fff"
				r="5"
				stroke="#808080"
				stroke-width="3"
		/>
		<circle
				cx="12"
				cy="12"
				r="1"
				stroke="#808080"
		/>
	</g>
</svg>
