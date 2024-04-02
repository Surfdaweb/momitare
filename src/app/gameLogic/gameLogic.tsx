'use client';
import { useEffect, useState } from 'react';

import { Card } from '../cardContent/cardContent';
import Game from '../game/game';
import { BuildDeckService } from '../services/buildDeck/buildDeck.service';

export default function GameLogic() {
  const foundations: Card[][] = [[], [], [], [], [], [], [], []];
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

  useEffect(() => {
    setTableau(dealNewGame());
  }, []);

  return (
    <Game
      drawCard={drawCard}
      drawnCard={drawnCard}
      foundations={foundations}
      hand={hand}
      openClosePile={openClosePile}
      tableau={tableau}
    />
  );
}
