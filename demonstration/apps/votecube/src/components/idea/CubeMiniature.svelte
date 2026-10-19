<script lang="ts">
	import { DEPENDENCY_INJECTION, type IChildContainer } from "@airport/direction-indicator";
	import { CubeEventListener, MutationApi } from "@votecube/cube-logic";
	import type { IUiAgreement } from "@votecube/model";
		import { onDestroy, onMount } from "svelte";
	import CharacterButton from "@votecube/ui-controls/src/button/CharacterButton.svelte";

	interface Props {
		cubeSides: any[];
		delta: any;
		agreement: IUiAgreement;
	}

	let { cubeSides, delta, agreement }: Props = $props();

	let container: IChildContainer;
	let loading = $state(true);
	let rotating = $state(false);

	onMount(async () => {
		container = DEPENDENCY_INJECTION.ui("CubeMiniature");
		const [cubeEventListener, mutationApi] = await container.get(
			CubeEventListener,
			MutationApi
		);

		cubeEventListener.setView("cubeMin");
		await mutationApi.recompute();
		setTimeout(() => {
			loading = false;
			rotating = true;
			setTimeout(() => {
				rotating = false;
			}, 700);
		}, 1);
	});

	onDestroy(async () => {
		const cubeEventListener = await container.get(CubeEventListener);
		cubeEventListener.clearView("cubeMin");
		DEPENDENCY_INJECTION.remove(container);
	});

	function v<T>(val: T, _delta: number): T {
		return val;
	}
	let transformMillis = $derived(v(agreement ? agreement.changeMillis : 700, delta));
</script>

<section id="viewportMin">
	<figure
		id="cubeMin"
		style="transition: transform {transformMillis}ms linear;"
	>
		{#each cubeSides as cubeSide, i}
			<div
				class="surface {loading ? 'loading' : ''} {rotating
					? 'rotating'
					: ''}"
				id="sm{i}"
				style="
            background-color: #{cubeSide.colorRGB};
              "
			>
				{#if !loading && !rotating}
					<!--{#if position.dir == 1}-->
					<header></header>
					<!--{/if}-->
					<p>
						<CharacterButton
							character={cubeSide.outcome}
							fontSize={20}
							fontX={12}
							fontY={19}
							size={24}
							strokeWidth={1}
							styles="left: 4px; position: absolute; top: 4px;"
						/>
					</p>
					<!--
			{#if position.dir == -1}
			<footer>
			</footer>
			{/if}
			-->
				{/if}
			</div>
		{/each}
	</figure>
</section>

<style>
	#cubeMin {
		height: 32px;
		margin: auto;
		position: relative;
		/*transform: rotateX(0deg) rotateY(-90deg);*/
		transform-style: preserve-3d;
		/*top: 50%;*/
		width: 32px;
	}

	#cubeMin > div {
		/*border: 5px groove gray;*/
		border: 1px solid gray;
		border-radius: 2px;
		color: #000;
		font-size: 1.7em;
		/*height: 320px;*/
		height: 31px;
		line-height: 1.7em;
		position: absolute;
		/*width: 320px;*/
		width: 31px;
		/*
		height: 360px;
		width: 360px;
		padding: 20px;
		font-size: 1.8em;
		line-height: 2em;
		*/
	}

	#sm0 {
		/*background: hsla(  0, 100%, 50%, 0.95);*/
		transform: rotateX(90deg) translateZ(16px) /*translateZ(200px)*/;
	}

	#sm1 {
		transform: translateZ(16px) /*translateZ(200px)*/;
	}

	#sm2 {
		transform: rotateY(90deg) translateZ(16px) /*translateZ(200px)*/;
	}

	#sm3 {
		transform: rotateY(180deg) translateZ(16px) /*translateZ(200px)*/;
	}

	#sm4 {
		transform: rotateY(-90deg) translateZ(16px) /*translateZ(200px)*/;
	}

	#sm5 {
		transform: rotateX(-90deg) rotate(180deg) translateZ(16px)
			/*translateZ(200px)*/;
	}

	#viewportMin {
		height: 100%;
		perspective: 90px; /* FIXME: make the cube more approachable 150px ~ 250px;*/
		/* 150 increases range from 11% to 9%, 250 increases to 6% */
		perspective-origin: 50% 16px; /* 670px; */
		/*transform: scale(0.75,0.75);*/
		width: 100%;
	}

	div {
		transition: width 700ms, height 700ms, transform 700ms;
		transition-timing-function: ease-out;
	}

	div.rotating {
		transform: rotateX(180deg) rotateY(180deg) !important;
	}

	div.loading {
		width: 1px !important;
		height: 1px !important;
	}

	header {
		color: #fff;
		background-color: #000;
		width: 100%;
		white-space: nowrap;
		height: 5px;
	}

	p {
		margin-block-start: 0em;
		margin-block-end: 0em;
		padding: 0 10px;
	}

	section {
		left: 0px;
		position: absolute;
		top: 23px;
	}

	.surface {
		position: relative;
	}
</style>
