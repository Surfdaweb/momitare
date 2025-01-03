'use client';
import { useEffect, useState } from 'react';

import { Card } from '../cardContent/cardContent';
import Footer from '../footer/footer';
import Game from '../game/game';
import { BuildDeckService } from '../services/buildDeck/buildDeck.service';
import styles from './gameLogic.module.scss';

export default function GameLogic() {
  const [foundations, setFoundations] = useState<Card[][]>([[], [], [], [], [], [], [], []]);
  const [tableau, setTableau] = useState<Card[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ]);
  const [hand, setHand] = useState<Card[]>([]);
  const [drawnCard, setDrawnCard] = useState<Card>();
  const [score, setScore] = useState<number>(104);

  const dealNewGame = (): Card[][] => {
    const deck: Card[] = BuildDeckService.buildDeck();
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

  const drawCard = () => {
    if (hand.length > 0) {
      return;
    }
    const stockPile = tableau[10].map((card) => card);
    const drawnCard = stockPile.pop();

    if (drawnCard) {
      const newTableau = tableau.map((pile, index) => {
        if (index === 10) {
          return stockPile;
        }
        return tableau[index];
      });

      setTableau(newTableau);
      setHand([drawnCard]);
      setDrawnCard(drawnCard);
    }
  };

  const openClosePile = () => {
    if (!drawnCard) {
      return;
    }

    let tableauIndex = drawnCard.value - 1;
    if (drawnCard.value > 10) {
      tableauIndex++;
    }

    const pileToOpen = tableau[tableauIndex];
    let newHand: Card[];
    let newTableau: Card[][];

    if (pileToOpen.length > 0) {
      newHand = hand.map((card) => card);
      pileToOpen.forEach((card) => newHand.push(card));

      newTableau = tableau.map((pile, index) => {
        if (index === tableauIndex) {
          return [];
        }
        return pile;
      });
    } else {
      newHand = [];
      newTableau = tableau.map((pile, index) => {
        if (index === tableauIndex) {
          return hand;
        }
        return pile;
      });
    }

    setHand(newHand);
    setTableau(newTableau);
  };

  const addCardToFoundation = (
    chosenCard: Card,
    foundationIndex: number,
    tableauIndex: number = -1
  ) => {
    if (!ableToPlaceCard(chosenCard, foundationIndex)) {
      return;
    }
    if (tableauIndex > -1) {
      const newTableauPile = tableau[tableauIndex].filter((card) => card != chosenCard);
      const newTableau = tableau.map((pile, index) => {
        if (index === tableauIndex) {
          return newTableauPile;
        }
        return pile;
      });
      setTableau(newTableau);
    } else {
      const newHand = hand.filter((card) => card != chosenCard);
      setHand(newHand);
    }

    const newFoundationPile = foundations[foundationIndex].map((card) => card);
    newFoundationPile.push(chosenCard);
    const newFoundations = foundations.map((pile, index) => {
      if (index === foundationIndex) {
        return newFoundationPile;
      }
      return pile;
    });

    setFoundations(newFoundations);
    const newScore = score - 1;
    setScore(newScore);
  };

  const ableToPlaceCard = (chosenCard: Card, foundationIndex: number): boolean => {
    const foundationPile = foundations[foundationIndex];

    if (foundationPile.length === 0 && foundationIndex < 4 && chosenCard.value === 1) {
      for (let i = 0; i < 4; i++) {
        if (foundations[i].length > 0 && foundations[i][0].suit === chosenCard.suit) {
          return false;
        }
      }
      return true;
    }

    if (foundationPile.length === 0 && foundationIndex > 3 && chosenCard.value === 13) {
      for (let i = 4; i < 8; i++) {
        if (foundations[i].length > 0 && foundations[i][0].suit === chosenCard.suit) {
          return false;
        }
      }
      return true;
    }

    if (foundationPile.length === 0) {
      return false;
    }

    const pileCard = foundationPile[foundationPile.length - 1];
    if (pileCard.suit != chosenCard.suit) {
      return false;
    }
    if (foundationIndex < 4 && pileCard.value === chosenCard.value - 1) {
      return true;
    }
    if (foundationIndex > 3 && pileCard.value === chosenCard.value + 1) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    setTableau(dealNewGame());
  }, []);

  return (
    <>
      <main className={styles.mainContent}>
        <Game
          addCardToFoundation={addCardToFoundation}
          drawCard={drawCard}
          drawnCard={drawnCard}
          foundations={foundations}
          hand={hand}
          openClosePile={openClosePile}
          tableau={tableau}
        />
      </main>
      <Footer score={score}></Footer>
    </>
  );
}
