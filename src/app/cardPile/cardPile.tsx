import styles from './cardPile.module.scss';

export enum Suit {
  Hearts,
  Spades,
  Diamonds,
  Clubs
}

export interface Card {
  suit: Suit;
  value: number;
}

export interface CardPileProps {
  cards?: Card[];
  isFaceUp?: boolean;
  label?: string;
  name: string;
}

export default function CardPile({
  cards = [],
  isFaceUp = false,
  name,
  label = ''
}: CardPileProps) {
  if (cards.length == 0) {
    return (
      <button className={styles.emptyPile} aria-label={`The ${name} pile is empty`}>
        <p>{label}</p>
      </button>
    );
  }

  return <button className={isFaceUp ? '' : styles.faceDownCard}></button>;
}
