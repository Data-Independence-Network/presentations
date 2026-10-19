<script lang="ts">
	import type { Snippet } from 'svelte'
	import Popover from './Popover.svelte'

	interface Props {
		contentClass?: string;
		contentStyles?: string;
		customCancel?: boolean;
		infoOnly?: boolean;
		maxWidth?: string | null;
		viewOnly?: boolean;
		width?: number;
		oncancel?: () => void;
		header?: Snippet;
		content?: Snippet;
		cancel?: Snippet;
		actions?: Snippet;
	}

	let {
		contentClass = '',
		contentStyles = '',
		customCancel = false,
		infoOnly = false,
		maxWidth = null,
		viewOnly = false,
		width = 380,
		oncancel,
		header,
		content: body,
		cancel,
		actions
	}: Props = $props();
</script>

<Popover
		{maxWidth}
		{width}
>
	{#snippet content()}
		<div class="content">
			<header>
				{#if !customCancel}
				<nav
						class="left"
						onclick={oncancel}
				>
					╳
				</nav>
				<nav
						class="right"
						onclick={oncancel}
				>
					╳
				</nav>
				{/if}
				{@render header?.()}
			</header>
			<p
					class={contentClass}
					style={contentStyles}
			>
				{@render body?.()}
			</p>
			{#if !viewOnly}
			<footer
					class:infoOnly
			>
				{#if customCancel}
				{@render cancel?.()}
				{/if}
				<div>
					{@render actions?.()}
				</div>
			</footer>
			{/if}
		</div>
	{/snippet}
</Popover>

<style>
	.content {
		color: #222;
	}

	footer {
		text-align: center;
		width: 100%;
	}

	footer div {
		text-align: center;
	}

	header {
		font-size: 1.3em;
		font-weight: bold;
		text-align: center;
		margin: 3px 0 15px 0;
		width: 100%;

	}

	nav {
		color: black;
		font-size: 0.7em;
		height: 50px;
		line-height: 50px;
		position: absolute;
		text-align: center;
		top: 0px;
		vertical-align: middle;
		width: 50px;
	}

	nav.left {
		left: 0px;
	}

	nav.right {
		right: 0px;
	}

	p {
		text-align: center;
	}

	.infoOnly {
		text-align: center;
	}
</style>
