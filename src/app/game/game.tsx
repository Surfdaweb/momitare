import CardPile, { Card, Suit } from '../cardPile/cardPile';
import styles from './game.module.scss';

export default function Game() {
  const cards: Card[] = [
    {
      value: 1,
      suit: Suit.Spades
    }
  ];

  return (
    <>
      <div className={styles.gameContainer}>
        <CardPile name="Deal Pile" cards={cards}></CardPile>
      </div>
    </>
  );
}
