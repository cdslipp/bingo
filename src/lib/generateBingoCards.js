import Papa from 'papaparse';

// Needs to generate an array 50 unique bingo cards

export function generateBingoCards(csvData, numberOfCards = 50) {
	const { data: songs } = Papa.parse(csvData, { header: false });

	const bingoCards = [];
	for (let i = 0; i < numberOfCards; i++) {
		const shuffledSongs = shuffleArray(songs);
		const cardSongs = shuffledSongs.slice(0, 24);
		bingoCards.push(cardSongs);
	}
	return bingoCards;
}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
