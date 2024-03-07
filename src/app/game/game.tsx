import { Card } from '../cardContent/cardContent';
import CardPile from '../cardPile/cardPile';
import styles from './game.module.scss';

export default function Game() {
  const deck: Card[] = buildDeck();
  const foundations: Card[][] = [[], [], [], [], [], [], [], []];
  const tableau: Card[][] = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];

  // Needs to be something this component consumes, probably, for testing
  function buildDeck() {
    const buildingDeck: Card[] = [];
    for (let i = 1; i < 14; i++) {
      for (let j = 0; j < 4; j++) {
        buildingDeck.push({
          value: i,
          suit: j
        });
        buildingDeck.push({
          value: i,
          suit: j
        });
      }
    }
    return shuffleDeck(buildingDeck);
  }
  function shuffleDeck(myDeck: Card[]): Card[] {
    const deck = myDeck;
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  return (
    <>
      <div className={styles.gameContainer}>
        <div className={styles.foundations} data-testid="foundations">
          {foundations.map((cards, index) => {
            return <CardPile key={index} name={`Foundation ${index}`} cards={cards} label="A" />;
          })}
        </div>
        <div className={styles.tableau} data-testid="tableau">
          {tableau.map((cards, index) => {
            let label = `${index + 1}`;
            if (index == 0) {
              label = 'A';
            } else if (index == 10) {
              label = 'S';
            } else if (index == 11) {
              label = 'J';
            } else if (index == 12) {
              label = 'Q';
            } else if (index == 13) {
              label = 'K';
            }

            return (
              <CardPile key={index} name={`Tableau ${index + 1}`} cards={cards} label={label} />
            );
          })}
        </div>
        <div className={styles.hand} data-testid="hand">
          <CardPile name={`Deal`} cards={deck} label="D" />
        </div>
      </div>
    </>
  );
}
