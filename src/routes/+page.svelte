<script>
	import BingoCard from '$lib/BingoCard.svelte';
	import PaperSheet from '$lib/PaperSheet.svelte';
	import PrintReadyCards from '$lib/PrintReadyCards.svelte';
	import { generateBingoCards } from '$lib/generateBingoCards';

	let csvFile = $state(null);
	let currentCardIndex = $state(0);
	let numberOfCards = $state(50);
	let bingoCards = $state([]);
	let pdfUrl = $state(null);
	let bingoTitle = $state('Bingo Title');
	let isLoading = $state(false);

	function readFile(event) {
		console.log('Reading file');
		let file = event.target.files[0];
		let reader = new FileReader();
		reader.readAsText(file);

		reader.onload = function () {
			console.log(reader.result);
			csvFile = reader.result;
		};

		reader.onerror = function () {
			console.log(reader.error);
		};
	}

	function prevCard() {
		if (currentCardIndex > 0) {
			currentCardIndex--;
		}
	}

	function nextCard() {
		if (currentCardIndex < numberOfCards - 1) {
			currentCardIndex++;
		}
	}

	$effect(() => {
		if (csvFile) {
			console.log('generating bingo card');
			bingoCards = generateBingoCards(csvFile, numberOfCards);
		}
	});
</script>

<div class="wrapper">
	<div class="sidebar pico">
		<article>
			<h1>Bingo Maker</h1>
			<h3>Title your bingo</h3>
			<input type="text" bind:value={bingoTitle} />
			<h3>How many bingo cards would you like to generate?</h3>
			<input type="number" bind:value={numberOfCards} />
			<h3>Upload CSV</h3>
			<input type="file" on:change={readFile} accept=".csv" />
			<button on:click={() => window.print()}>Print</button>
		</article>
	</div>
	<div class="content">
		<PaperSheet>
			<h1>{bingoTitle}</h1>
			{#if bingoCards.length === 0}
				<p>Upload a CSV file to generate bingo cards</p>
			{:else}
				<div>
					<p>Card {currentCardIndex + 1} of {numberOfCards}</p>
					<button on:click={prevCard}>Prev</button>
					<button on:click={nextCard}>Next</button>
				</div>
				<BingoCard songs={bingoCards[currentCardIndex]} />
			{/if}
		</PaperSheet>
	</div>
</div>
<div id="printArea" class="print-area">
	<PrintReadyCards {bingoTitle} {bingoCards} />
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: 2fr 2fr;
		gap: 20px;
	}

	.sidebar {
		/* Styles for the sidebar */
	}

	.content {
		/* Styles for the content area */
	}

	.print-area {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@media print {
		.print-area,
		.print-area * {
			display: flex;
		}

		.wrapper {
			display: none;
		}
	}
</style>
