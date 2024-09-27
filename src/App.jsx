import { useState, useEffect, useMemo } from 'react';
import { Button, Link } from '@nextui-org/react';
import { Upload, Download } from 'lucide-react';
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

	const importData = () => {
		const fileInput = document.createElement('input');
		fileInput.type = 'file';
		fileInput.accept = 'application/json';

		fileInput.onchange = (event) => {
			const file = event.target.files[0];
			const reader = new FileReader();

			reader.onload = (e) => {
				try {
					const data = JSON.parse(e.target.result);
					setDecks(data);
				} catch (err) {
					// Todo: display error
					console.error('Error parsing JSON:', err);
				}
			};

			reader.readAsText(file);
		};

		fileInput.click();
	};

	const exportLink = useMemo(() => {
		return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(decks))}`;
	}, [decks]);

	return (
		<div className="container mx-auto p-4">
			<div className="flex flex-row justify-between items-center">
				<h1 className="text-3xl font-bold mb-4">Memento</h1>
				<div>
					<Button className="mr-4" onClick={importData}>
						<Upload className="mr-1 h-4 w-4" />
						Import
					</Button>
					<Button as={Link} download="memento-data.json" href={exportLink}>
						<Download className="mr-1 h-4 w-4" />
						Export
					</Button>
				</div>
			</div>
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
