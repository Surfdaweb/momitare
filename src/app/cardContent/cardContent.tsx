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
  isCompletedFoundation?: boolean;
}

export default function CardContent({ card, isCompletedFoundation = false }: CardProps) {
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
      suitLabel = 'Clubs';
      break;
    case Suit.Diamonds:
      suitLabel = 'Diamonds';
      break;
    case Suit.Hearts:
      suitLabel = 'Hearts';
      break;
    case Suit.Spades:
      suitLabel = 'Spades';
      break;
    default:
      suitLabel = 'error';
      break;
  }
  const altText = `of ${suitLabel}${isCompletedFoundation ? ' Completed' : ''}`;
  const imgSrc = `/${suitLabel}${isCompletedFoundation ? '-completed' : ''}.png`;

  return (
    <>
      <p
        className={`${styles.cardValue} ${isRedCard ? styles.redCard : ''} ${isCompletedFoundation ? styles.completedFoundation : ''}`}
      >
        {cardValLabel}
      </p>
      <img src={imgSrc} alt={altText} />
    </>
  );
}
