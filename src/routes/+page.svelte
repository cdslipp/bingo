<script>
	import BingoCard from '$lib/BingoCard.svelte';
	import PaperSheet from '$lib/PaperSheet.svelte';
	import PrintReadyCards from '$lib/PrintReadyCards.svelte';
	import { generateBingoCards } from '$lib/generateBingoCards';

	let csvFile = $state(null);
	let currentCardIndex = $state(0);
	let numberOfCards = $state(50);
	let bingoCards = $state([]);
	let bingoTitle = $state('Bingo Title');
	let selectedFont = $state('Sans Serif');
	let baseFontSize = $state(16);

	// Compute fontFamily based on selectedFont
	let fontFamily = $derived(selectFontFamily(selectedFont));

	function increaseFontSize() {
		if (baseFontSize < 30) baseFontSize++;
	}

	function selectFontFamily(font) {
		if (font === 'Serif') return 'serif';
		if (font === 'Sans Serif') return 'sans-serif';
		if (font === 'Monospace') return '"American Typewriter", Courier, monospace';
		if (font === 'Creepster') return 'Creepster, cursive'; // Add this
		if (font === 'Nosifer') return 'Nosifer, cursive'; // Add this
		return 'sans-serif'; // Default fallback
	}

	function decreaseFontSize() {
		if (baseFontSize > 10) baseFontSize--;
	}

	function readFile(event) {
		console.log('Reading file');
		let file = event.target.files[0];
		let reader = new FileReader();
		reader.readAsText(file);

		reader.onload = function () {
			console.log(reader.result);
			csvFile = reader.result;
			generateCards(); // Generate bingo cards after reading the file
		};

		reader.onerror = function () {
			console.log(reader.error);
		};
	}

	function generateCards() {
		if (csvFile) {
			console.log('generating bingo cards');
			bingoCards = generateBingoCards(csvFile, numberOfCards);
		}
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

	// Regenerate cards when numberOfCards changes
	$effect(() => {
		if (csvFile) {
			generateCards();
		}
		console.log('Font family', fontFamily);
	});

	// Derived state for uniqueSongCount
	let uniqueSongCount = $derived(() => {
		if (bingoCards.length > 0) {
			const allSongs = bingoCards.flat().map((card) => card.song);
			return new Set(allSongs.filter((song) => song !== 'FREE')).size;
		} else {
			return 0;
		}
	});
</script>

<div class="wrapper">
	<div class="sidebar pico">
		<article>
			<h1>🎃 Bingo Maker 🧛🏻‍♂️</h1>
			<p>Current Card Index: {currentCardIndex}</p>
			<h3>Title your bingo</h3>
			<input type="text" bind:value={bingoTitle} />
			<h3>How many bingo cards would you like to generate?</h3>
			<input type="number" bind:value={numberOfCards} />
			<h3>Select Font Family</h3>
			<select bind:value={selectedFont}>
				<option value="Serif">Serif</option>
				<option value="Sans Serif">Sans Serif</option>
				<option value="Monospace">Monospace</option>
				<option value="Creepster">Creepster</option>
				<option value="Nosifer">Nosifer</option>
			</select>
			<h3>Adjust Font Size</h3>
			<div>
				<button onclick={decreaseFontSize}>-</button>
				<span>{baseFontSize}px</span>
				<button onclick={increaseFontSize}>+</button>
			</div>
			<h3>Upload CSV</h3>
			<input type="file" onchange={readFile} accept=".csv" />
			{#if uniqueSongCount > 0}
				<p>You have submitted {uniqueSongCount} songs.</p>
			{/if}
			<button onclick={() => window.print()}>Print</button>
		</article>
	</div>
	<div class="content">
		<h1 style="font-family: {fontFamily};">{bingoTitle}</h1>
		{#if bingoCards.length === 0}
			<p>Upload a CSV file to generate bingo cards</p>
		{:else}
			<div>
				<p>Card {currentCardIndex + 1} of {numberOfCards}</p>
				<button onclick={prevCard}>Prev</button>
				<button onclick={nextCard}>Next</button>
			</div>
			<BingoCard songs={bingoCards[currentCardIndex]} {fontFamily} {baseFontSize} />
		{/if}
	</div>
</div>
<div id="printArea" class="print-area hidden">
	<PrintReadyCards {bingoTitle} {bingoCards} {fontFamily} {baseFontSize} />
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Creepster&family=Nosifer&display=swap');

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

	.hidden {
		display: none;
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
