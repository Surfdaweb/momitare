'use client';
import { useState } from 'react';

import { Card } from '../cardContent/cardContent';
import CardPile from '../cardPile/cardPile';
import styles from './game.module.scss';

export type GameProps = {
  addCardToFoundation: (card: Card, tableauIndex?: number) => void;
  drawCard: () => void;
  drawnCard: Card | undefined;
  foundations: Card[][];
  hand: Card[];
  openClosePile: () => void;
  tableau: Card[][];
};

export default function Game({
  addCardToFoundation,
  drawCard,
  drawnCard,
  foundations,
  hand,
  openClosePile,
  tableau
}: GameProps) {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [selectedCard, setSelectedCard] = useState(hand.length - 1);

  const minSwipeDistance = 20;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const xDistance = touchStartX - e.targetTouches[0].clientX;
    const yDistance = touchStartY - e.targetTouches[0].clientY;
    if (Math.abs(yDistance) >= Math.abs(xDistance)) {
      return;
    }

    if (xDistance > minSwipeDistance) {
      if (selectedCard > 0) {
        setSelectedCard(selectedCard - 1);
      }
      setTouchStartX(e.targetTouches[0].clientX);
      setTouchStartY(e.targetTouches[0].clientY);
    }

    if (xDistance < -minSwipeDistance) {
      if (selectedCard < hand.length - 1) {
        setSelectedCard(selectedCard + 1);
      }
      setTouchStartX(e.targetTouches[0].clientX);
      setTouchStartY(e.targetTouches[0].clientY);
    }
  };

  return (
    <>
      <div className={styles.gameContainer}>
        <div className={styles.foundations} data-testid="foundations">
          {foundations.map((cards, index) => {
            let label = 'A';
            if (index > 3) {
              label = 'K';
            }
            return (
              <CardPile
                handleCardPileInteract={() => {}}
                isFaceUp={true}
                key={index}
                name={`Foundation ${index}`}
                cards={cards}
                label={label}
              />
            );
          })}
        </div>
        <div className={styles.tableau} data-testid="tableau">
          {tableau.map((cards, index) => {
            let label = `${index + 1}`;
            let handleCardPileInteract = () => {};
            if (
              drawnCard &&
              ((index + 1 === drawnCard.value && index < 10) ||
                (index === drawnCard.value && index > 10))
            ) {
              handleCardPileInteract = openClosePile;
            } else {
              if (cards.length > 0) {
                handleCardPileInteract = () => {
                  addCardToFoundation(cards[cards.length - 1], index);
                };
              }
            }

            if (index === 0) {
              label = 'A';
            } else if (index === 10) {
              label = 'S';
              handleCardPileInteract = drawCard;
            } else if (index === 11) {
              label = 'J';
            } else if (index === 12) {
              label = 'Q';
            } else if (index === 13) {
              label = 'K';
            }

            return (
              <CardPile
                handleCardPileInteract={() => handleCardPileInteract()}
                key={index}
                name={`Tableau ${index + 1}`}
                isFaceUp={label === 'S' ? false : true}
                cards={cards}
                label={label}
              />
            );
          })}
        </div>
        <div
          data-testid="hand"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className={styles.hand}
        >
          {hand.length > 0 &&
            hand.map((card, index) => (
              <CardPile
                isFaceUp={true}
                name={`Hand ${index + 1}`}
                extraClass={index === selectedCard ? styles.selected : ''}
                handleCardPileInteract={() => addCardToFoundation(card)}
                key={index}
                cards={[card]}
                label=""
              ></CardPile>
            ))}
        </div>
      </div>
    </>
  );
}
