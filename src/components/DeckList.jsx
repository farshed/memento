import { useState } from 'react';
import { Button, Input, Card, CardBody } from '@nextui-org/react';
import { Plus, PlayCircle, Book } from 'lucide-react';

export default function DeckList({ decks, addDeck, setCurrentDeck, setCurrentView }) {
	const [newDeckName, setNewDeckName] = useState('');

	const handleAddDeck = () => {
		if (newDeckName.trim()) {
			addDeck(newDeckName.trim());
			setNewDeckName('');
		}
	};

	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">Your Decks</h2>
			<div className="flex mb-4">
				<Input
					type="text"
					value={newDeckName}
					onChange={(e) => setNewDeckName(e.target.value)}
					placeholder="New deck name"
					className="mr-2"
				/>
				<Button onClick={handleAddDeck}>
					<Plus className="mr-1 h-6 w-6" /> Add Deck
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{decks.map((deck, index) => (
					<Card key={index} className="p-4">
						<CardBody>
							<h3 className="text-xl font-semibold mb-2">{deck.name}</h3>
							<p className="mb-2">Cards: {deck.cards.length}</p>
							<p className="mb-4">Performance: {deck.performance.toFixed(2)}%</p>
							<div className="flex justify-between">
								<Button
									onClick={() => {
										setCurrentDeck(deck);
										setCurrentView('cards');
									}}>
									<Book className="mr-1 h-4 w-4" /> View Cards
								</Button>
								<Button
									onClick={() => {
										setCurrentDeck(deck);
										setCurrentView('practice');
									}}>
									<PlayCircle className="mr-1 h-4 w-4" /> Practice
								</Button>
							</div>
						</CardBody>
					</Card>
				))}
			</div>
		</div>
	);
}
