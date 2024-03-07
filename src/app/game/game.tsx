import { Card, Suit } from '../cardContent/cardContent';
import CardPile from '../cardPile/cardPile';
import styles from './game.module.scss';

export default function Game() {
  const deck: Card[] = [{ value: 1, suit: Suit.Hearts }];
  const foundations: Card[][] = [[], [], [], [], [], [], [], []];
  const tableau: Card[][] = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];

  return (
    <>
      <div className={styles.gameContainer}>
        <div className={styles.foundations} data-testid="foundations">
          {foundations.map((cards, index) => {
            return (
              <CardPile key={index} name={`Foundation ${index}`} cards={cards} label="A"></CardPile>
            );
          })}
        </div>
        <div className={styles.tableau} data-testid="tableau">
          {tableau.map((cards, index) => {
            return (
              <CardPile
                key={index}
                name={`Tableau Pile ${index}`}
                cards={cards}
                label="A"
              ></CardPile>
            );
          })}
        </div>
        <div data-testid="hand">
          <CardPile name={`Hand`} cards={deck} label="D"></CardPile>
        </div>
      </div>
    </>
  );
}
