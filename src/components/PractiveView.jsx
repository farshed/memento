import { useState } from 'react';
import { Button, Card, CardBody } from '@nextui-org/react';

export default function PracticeView({ deck, updateDeckPerformance, setCurrentView }) {
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [isFlipped, setIsFlipped] = useState(false);
	const [correctCount, setCorrectCount] = useState(0);

	const handleFlip = () => {
		setIsFlipped(!isFlipped);
	};

	const handleAnswer = (correct) => {
		if (correct) {
			setCorrectCount(correctCount + 1);
		}

		if (currentCardIndex < deck.cards.length - 1) {
			setCurrentCardIndex(currentCardIndex + 1);
			setIsFlipped(false);
		} else {
			const performance = (correctCount / deck.cards.length) * 100;
			updateDeckPerformance(performance);
			setCurrentView('decks');
		}
	};

	if (deck.cards.length === 0) {
		return (
			<div>
				<h2 className="text-2xl font-semibold mb-4">{deck.name} - Practice</h2>
				<p>This deck has no cards. Add some cards before practicing.</p>
				<Button onClick={() => setCurrentView('decks')} className="mt-4">
					Back to Decks
				</Button>
			</div>
		);
	}

	const currentCard = deck.cards[currentCardIndex];

	return (
		<div>
			<h2 className="text-2xl font-semibold mb-4">{deck.name} - Practice</h2>
			<p className="mb-4">
				Card {currentCardIndex + 1} of {deck.cards.length}
			</p>
			<Card
				isPressable
				className={`w-64 h-64 mx-auto mb-4 cursor-pointer transition-transform duration-500 transform ${
					isFlipped ? '[transform:rotateY(180deg)]' : ''
				}`}
				onClick={handleFlip}>
				<CardBody className="flex items-center justify-center h-full">
					<p className={`text-center ${isFlipped ? '[transform:rotateY(-180deg)]' : ''}`}>
						{isFlipped ? currentCard.back : currentCard.front}
					</p>
				</CardBody>
			</Card>
			<div className="flex justify-center space-x-4">
				<Button onClick={() => handleAnswer(false)} variant="destructive">
					Incorrect
				</Button>
				<Button onClick={() => handleAnswer(true)} variant="default">
					Correct
				</Button>
			</div>
		</div>
	);
}
