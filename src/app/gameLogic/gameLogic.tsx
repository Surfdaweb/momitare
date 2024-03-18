import { Card } from '../cardContent/cardContent';
import Game from '../game/game';

export const buildDeck = () => {
  const buildingDeck: Card[] = [];
  const shuffleDeck = (myDeck: Card[]): Card[] => {
    const deck = myDeck;
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  for (let i = 1; i < 14; i++) {
    for (let j = 0; j < 4; j++) {
      buildingDeck.push({
        value: i,
        suit: j
      });
      buildingDeck.push({
        value: i,
        suit: j
      });
    }
  }
  return shuffleDeck(buildingDeck);
};

const dealNewGame = (): Card[][] => {
  const deck: Card[] = buildDeck();
  const newTableau: Card[][] = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];

  deck.map((card, index) => {
    console.log(`Pile ${index % 14} added ${card.value}`);
    newTableau[index % 14].push(card);
  });

  return newTableau;
};

export default function GameLogic() {
  const foundations: Card[][] = [[], [], [], [], [], [], [], []];
  const tableau: Card[][] = dealNewGame();

  return <Game foundations={foundations} tableau={tableau} />;
}
