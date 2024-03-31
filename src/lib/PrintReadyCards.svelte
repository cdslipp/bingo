<script>
	export let bingoTitle = 'Bingo Card';
	export let bingoCards = [];
</script>

{#each bingoCards as bingoCard}
	<div class="paper-sheet">
		<h1>{bingoTitle}</h1>
		<div class="bingo-card">
			{#each bingoCard as song}
				{#if song === 'FREE'}
					<div class="bingo-cell" style="font-weight: bolder; font-size: 32px;">
						{song}
					</div>
				{:else}
					<div class="bingo-cell">
						{song}
					</div>
				{/if}
			{/each}
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
		page-break-after: always;
	}

	.bingo-card {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		gap: 2px;
		padding: 0;
	}

	.bingo-cell {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		height: 1.5in;
		width: 1.5in;
		text-align: center;
		border-top: 1px solid black; /* Add top border to all cells */
		border-left: 1px solid black; /* Add left border to all cells */
	}

	.bingo-card > .bingo-cell:nth-child(5n) {
		/* Target every 5th cell (last column) */
		border-right: 1px solid black; /* Add right border to last column */
		border-left: 1px solid black; /* Remove left border from last column */
	}

	.bingo-card > .bingo-cell:nth-last-child(-n + 5) {
		/* Target last 5 cells (last row) */
		border-bottom: 1px solid black; /* Add bottom border to last row */
		border-top: 1px solid black; /* Remove top border from last row */
	}
</style>
