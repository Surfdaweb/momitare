'use client';
import CardContent, { Card } from '../cardContent/cardContent';
import styles from './cardPile.module.scss';

export interface CardPileProps {
  cards?: Card[];
  extraClass?: string;
  handleCardPileInteract: () => void;
  isCompletedFoundation?: boolean;
  isFaceUp?: boolean;
  isSelected?: boolean;
  label: string;
  name: string;
}

export default function CardPile({
  cards = [],
  extraClass = '',
  isCompletedFoundation = false,
  isFaceUp = false,
  isSelected = false,
  name,
  label,
  handleCardPileInteract
}: CardPileProps) {
  if (cards.length == 0) {
    return (
      <button
        onClick={() => {
          handleCardPileInteract();
        }}
        className={`${styles.card} ${styles.emptyPile}`}
        aria-label={`The ${name} pile is empty`}
      >
        <p>{label}</p>
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        handleCardPileInteract();
      }}
      className={`${styles.card} 
        ${isFaceUp ? '' : styles.faceDownCard}
        ${isSelected ? styles.selectedCard : ''}
        ${cards.length === 2 ? styles.cardStack2 : ''}
        ${cards.length === 3 ? styles.cardStack3 : ''}
        ${cards.length === 4 ? styles.cardStack4 : ''}
        ${cards.length === 5 ? styles.cardStack5 : ''}
        ${cards.length === 6 ? styles.cardStack6 : ''}
        ${cards.length === 7 ? styles.cardStack7 : ''}
        ${cards.length === 8 ? styles.cardStack8 : ''}
        ${cards.length === 9 ? styles.cardStack9 : ''}
        ${cards.length >= 10 ? styles.cardStack10Plus : ''}
        ${isCompletedFoundation ? styles.completedFoundation : ''}
        ${extraClass}
      `}
    >
      <div>
        {isFaceUp && (
          <CardContent
            card={cards[cards.length - 1]}
            isCompletedFoundation={isCompletedFoundation}
          />
        )}
      </div>
    </button>
  );
}
