'use client';
import CardContent, { Card } from '../cardContent/cardContent';
import styles from './cardPile.module.scss';

export interface CardPileProps {
  cards?: Card[];
  extraClass?: string;
  handleCardPileInteract: () => void;
  isFaceUp?: boolean;
  label: string;
  name: string;
}

export default function CardPile({
  cards = [],
  extraClass = '',
  isFaceUp = false,
  name,
  label = '',
  handleCardPileInteract
}: CardPileProps) {
  if (cards.length == 0) {
    return (
      <button
        onClick={() => handleCardPileInteract()}
        className={`${styles.card} ${styles.emptyPile}`}
        aria-label={`The ${name} pile is empty`}
      >
        <p>{label}</p>
      </button>
    );
  }

  return (
    <button
      onClick={() => handleCardPileInteract()}
      className={`${styles.card} 
        ${isFaceUp ? styles.faceUpCard : styles.faceDownCard}
        ${extraClass}
      `}
    >
      {isFaceUp && <CardContent card={cards[cards.length - 1]} />}
    </button>
  );
}
