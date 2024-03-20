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

  let newTableauIndex = 0;
  while (deck.length > 0) {
    const originalCardDealt = deck.pop();
    if (originalCardDealt) {
      newTableau[newTableauIndex].push(originalCardDealt);

      if (newTableauIndex === 6 || newTableauIndex === 13) {
        const endOfRowCard = deck.pop();
        if (!endOfRowCard) {
          break;
        }
        newTableau[10].push(endOfRowCard);
      }

      if (newTableauIndex != 10 && originalCardDealt.value === 1) {
        const aceCard = deck.pop();
        if (!aceCard) {
          break;
        }
        newTableau[10].push(aceCard);
      }

      if (
        newTableauIndex != 10 &&
        ((originalCardDealt.value < 11 && originalCardDealt.value === newTableauIndex + 1) ||
          (originalCardDealt.value > 10 && originalCardDealt.value === newTableauIndex))
      ) {
        const matchingCard = deck.pop();
        if (!matchingCard) {
          break;
        }
        newTableau[10].push(matchingCard);
      }

      if (newTableauIndex > 12) {
        newTableauIndex = 0;
      } else {
        newTableauIndex++;
      }
    }
  }

  return newTableau;
};

export default function GameLogic() {
  const foundations: Card[][] = [[], [], [], [], [], [], [], []];
  const tableau: Card[][] = dealNewGame();

  return <Game foundations={foundations} tableau={tableau} />;
}
