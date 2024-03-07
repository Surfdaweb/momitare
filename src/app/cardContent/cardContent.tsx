import styles from './cardContent.module.scss';

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

export interface CardProps {
  card: Card;
}

export default function CardContent({ card }: CardProps) {
  let cardValLabel = '';
  let suitLabel = '';
  let isRedCard = false;

  isRedCard = card.suit == Suit.Diamonds || card.suit == Suit.Hearts;
  switch (card.value) {
    case 1:
      cardValLabel = 'A';
      break;
    case 11:
      cardValLabel = 'J';
      break;
    case 12:
      cardValLabel = 'Q';
      break;
    case 13:
      cardValLabel = 'K';
      break;
    default:
      cardValLabel = `${card.value}`;
      break;
  }

  switch (card.suit) {
    case Suit.Clubs:
      suitLabel = 'clubs';
      break;
    case Suit.Diamonds:
      suitLabel = 'diamonds';
      break;
    case Suit.Hearts:
      suitLabel = 'hearts';
      break;
    case Suit.Spades:
      suitLabel = 'spades';
      break;
    default:
      suitLabel = 'error';
      break;
  }

  return (
    <>
      <p className={`${styles.cardValue} ${isRedCard ? styles.redCard : ''}`}>{cardValLabel}</p>
      <img src={`/${suitLabel}.png`} alt={`of ${suitLabel}`} />
    </>
  );
}
