import { useState } from 'react';
import { Button, Input, Card, CardBody } from '@nextui-org/react';

export default function CardList({ deck, addCard, setCurrentView }) {
	const [newCardFront, setNewCardFront] = useState('');
	const [newCardBack, setNewCardBack] = useState('');

	const handleAddCard = () => {
		if (newCardFront.trim() && newCardBack.trim()) {
			addCard(newCardFront.trim(), newCardBack.trim());
			setNewCardFront('');
			setNewCardBack('');
		}
	};

	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">{deck.name} - Cards</h2>
			<Button onClick={() => setCurrentView('decks')} className="mb-4">
				Back to Decks
			</Button>
			<div className="mb-4">
				<Input
					type="text"
					value={newCardFront}
					onChange={(e) => setNewCardFront(e.target.value)}
					placeholder="Front of card"
					className="mb-2"
				/>
				<Input
					type="text"
					value={newCardBack}
					onChange={(e) => setNewCardBack(e.target.value)}
					placeholder="Back of card"
					className="mb-2"
				/>
				<Button onClick={handleAddCard}>Add Card</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{deck.cards.map((card, index) => (
					<Card key={index} className="p-4">
						<CardBody>
							<h3 className="text-lg font-semibold mb-2">Front: {card.front}</h3>
							<p>Back: {card.back}</p>
						</CardBody>
					</Card>
				))}
			</div>
		</div>
	);
}
