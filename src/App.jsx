import React, { useState, useEffect } from 'react';
import DeckList from './components/DeckList';
import CardList from './components/CardList';
import PracticeView from './components/PractiveView';

const saveToLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
	const value = localStorage.getItem(key);
	return value ? JSON.parse(value) : null;
};

export default function App() {
	const [decks, setDecks] = useState([]);
	const [currentView, setCurrentView] = useState('decks');
	const [currentDeck, setCurrentDeck] = useState(null);

	useEffect(() => {
		const storedDecks = getFromLocalStorage('decks');
		if (storedDecks) {
			setDecks(storedDecks);
		}
	}, []);

	useEffect(() => {
		if (decks.length) {
			saveToLocalStorage('decks', decks);
		}
	}, [decks]);

	const addDeck = (name) => {
		setDecks([...decks, { name, cards: [], performance: 0 }]);
	};

	const addCard = (deckIndex, front, back) => {
		const newDecks = [...decks];
		newDecks[deckIndex].cards.push({ front, back, lastReviewed: null, interval: 1 });
		setDecks(newDecks);
	};

	const updateDeckPerformance = (deckIndex, performance) => {
		const newDecks = [...decks];
		newDecks[deckIndex].performance = performance;
		setDecks(newDecks);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Memento</h1>
			{currentView === 'decks' && (
				<DeckList
					decks={decks}
					addDeck={addDeck}
					setCurrentDeck={setCurrentDeck}
					setCurrentView={setCurrentView}
				/>
			)}
			{currentView === 'cards' && (
				<CardList
					deck={currentDeck}
					addCard={(front, back) => addCard(decks.indexOf(currentDeck), front, back)}
					setCurrentView={setCurrentView}
				/>
			)}
			{currentView === 'practice' && (
				<PracticeView
					deck={currentDeck}
					updateDeckPerformance={(performance) =>
						updateDeckPerformance(decks.indexOf(currentDeck), performance)
					}
					setCurrentView={setCurrentView}
				/>
			)}
		</div>
	);
}
