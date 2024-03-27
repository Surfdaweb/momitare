'use client';
import CardContent, { Card } from '../cardContent/cardContent';
import CardPile from '../cardPile/cardPile';
import styles from './game.module.scss';

export type GameProps = {
  drawCard: () => void;
  foundations: Card[][];
  hand: Card[];
  tableau: Card[][];
};

export default function Game({ drawCard, foundations, tableau, hand }: GameProps) {
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
        <div data-testid="hand">
          {hand.length > 0 &&
            hand.map((card, index) => <CardContent key={index} card={card}></CardContent>)}
        </div>
      </div>
    </>
  );
}
