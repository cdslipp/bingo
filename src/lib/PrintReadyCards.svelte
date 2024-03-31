<script>
	import BingoCard from './BingoCard.svelte';
	export let bingoTitle = 'Bingo Card';
	export let bingoCards = [];
</script>

{#each bingoCards as bingoCard}
	<div class="paper-sheet">
		<h1>{bingoTitle}</h1>
		<div class="bingo-card">
			<BingoCard songs={bingoCard} />
		</div>
	</div>
{/each}

<style>
	.paper-sheet {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 8in;
		height: 10in;
		margin: 0;
		page-break-after: always;
	}

	.bingo-card {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		gap: 2px;
		width: 100%;
		height: 100%;
	}

	.bingo-cell {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		height: 1.5in;
		width: 1.5in;
		text-align: center;
		padding: 4px;
		border: 1px solid black;
	}
</style>
