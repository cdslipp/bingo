import Papa from 'papaparse';

export function generateBingoCards(csvData, numberOfCards = 50) {
	const { data: songs } = Papa.parse(csvData, { header: false });

	const bingoCards = [];
	for (let i = 0; i < numberOfCards; i++) {
		const shuffledSongs = shuffleArray(songs);
		const cardSongs = shuffledSongs.slice(0, 24).map((song) => {
			return { song: song, fontSize: getFontSize(song[0]) };
		});
		// Insert "FREE" in the middle of the card
		cardSongs.splice(12, 0, { song: 'FREE', fontSize: 'x-large' });
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

function getFontSize(song) {
	console.log(song);
	const maxLength = Math.max(...song.split(' ').map((word) => word.length));
	const totalLength = song.length;

	if (maxLength > 10 || totalLength > 30) {
		return 'small';
	} else if (maxLength > 7 || totalLength > 25) {
		return 'medium';
	} else if (maxLength > 5 || totalLength > 20) {
		return 'large';
	} else {
		return 'x-large';
	}
}
