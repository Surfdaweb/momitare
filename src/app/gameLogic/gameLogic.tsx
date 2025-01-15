'use client';
import { useEffect, useState } from 'react';

import ActionBar from '../actionBar/actionBar';
import { Card } from '../cardContent/cardContent';
import Footer from '../footer/footer';
import Game from '../game/game';
import { BuildDeckService } from '../services/buildDeck/buildDeck.service';
import styles from './gameLogic.module.scss';

enum CommandType {
  ADD_CARD_TO_FOUNDATION,
  DRAW_CARD
}

type Command = {
  commandType: CommandType;
  foundationIndex: number;
  movedCard: Card;
  previousDrawnCard: Card | undefined;
  previousPileIndex: number;
  previousTableauIndex: number;
};

export default function GameLogic() {
  const [foundations, setFoundations] = useState<Card[][]>([[], [], [], [], [], [], [], []]);
  const [tableau, setTableau] = useState<Card[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
  ]);
  const [hand, setHand] = useState<Card[]>([]);
  const [drawnCard, setDrawnCard] = useState<Card>();
  const [score, setScore] = useState<number>(104);
  const [commandStack, setCommandStack] = useState<Command[]>([]);

  const dealNewGame = (): Card[][] => {
    const deck: Card[] = BuildDeckService.buildDeck();
    const newTableau: Card[][] = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];

    let newTableauIndex = 0;
    while (deck.length > 0) {
      const originalCardDealt = deck.pop();
      if (originalCardDealt) {
        newTableau[newTableauIndex].push(originalCardDealt);

        if (newTableauIndex === 6 || newTableauIndex === 13) {
          const endOfRowCard = deck.pop();
          if (!endOfRowCard) {
            break;
          }
          newTableau[10].push(endOfRowCard);
        }

        if (newTableauIndex != 10 && originalCardDealt.value === 1) {
          const aceCard = deck.pop();
          if (!aceCard) {
            break;
          }
          newTableau[10].push(aceCard);
        }

        if (
          newTableauIndex != 10 &&
          ((originalCardDealt.value < 11 && originalCardDealt.value === newTableauIndex + 1) ||
            (originalCardDealt.value > 10 && originalCardDealt.value === newTableauIndex))
        ) {
          const matchingCard = deck.pop();
          if (!matchingCard) {
            break;
          }
          newTableau[10].push(matchingCard);
        }

        if (newTableauIndex > 12) {
          newTableauIndex = 0;
        } else {
          newTableauIndex++;
        }
      }
    }

    return newTableau;
  };

  const drawCard = () => {
    if (hand.length > 0) {
      return;
    }
    const stockPile = tableau[10].map((card) => card);
    const newDrawnCard = stockPile.pop();
    const oldDrawnCard = drawnCard;

    if (newDrawnCard) {
      const newTableau = tableau.map((pile, index) => {
        if (index === 10) {
          return stockPile;
        }
        return tableau[index];
      });

      setTableau(newTableau);
      setHand([newDrawnCard]);
      setDrawnCard(newDrawnCard);

      const newCommand = {
        commandType: CommandType.DRAW_CARD,
        foundationIndex: -1,
        movedCard: newDrawnCard,
        previousDrawnCard: oldDrawnCard,
        previousPileIndex: -1,
        previousTableauIndex: -1
      };
      addNewCommand(newCommand);
    }
  };

  const openClosePile = () => {
    if (!drawnCard) {
      return;
    }

    let tableauIndex = drawnCard.value - 1;
    if (drawnCard.value > 10) {
      tableauIndex++;
    }

    const pileToOpen = tableau[tableauIndex];
    let newHand: Card[];
    let newTableau: Card[][];

    if (pileToOpen.length > 0) {
      newHand = hand.map((card) => card);
      pileToOpen.forEach((card) => newHand.push(card));

      newTableau = tableau.map((pile, index) => {
        if (index === tableauIndex) {
          return [];
        }
        return pile;
      });
    } else {
      newHand = [];
      newTableau = tableau.map((pile, index) => {
        if (index === tableauIndex) {
          return hand;
        }
        return pile;
      });
    }

    setHand(newHand);
    setTableau(newTableau);
  };

  const addCardToFoundation = (
    chosenCard: Card,
    foundationIndex: number,
    tableauIndex: number = -1
  ) => {
    if (!ableToPlaceCard(chosenCard, foundationIndex)) {
      return;
    }
    let pileIndex = -1;
    let commandTableauIndex = tableauIndex;
    if (tableauIndex > -1) {
      const newTableauPile = tableau[tableauIndex].filter((card) => card != chosenCard);
      const newTableau = tableau.map((pile, index) => {
        if (index === tableauIndex) {
          return newTableauPile;
        }
        return pile;
      });
      pileIndex = newTableau.length - 1;
      setTableau(newTableau);
    } else {
      if (drawnCard && drawnCard.value > 10) {
        commandTableauIndex = drawnCard.value;
      } else if (drawnCard) {
        commandTableauIndex = drawnCard.value - 1;
      }

      const newHand = hand.filter((card, index) => {
        if (card != chosenCard) {
          return card;
        }
        pileIndex = index;
      });
      setHand(newHand);
    }

    const newFoundationPile = foundations[foundationIndex].map((card) => card);
    newFoundationPile.push(chosenCard);
    const newFoundations = foundations.map((pile, index) => {
      if (index === foundationIndex) {
        return newFoundationPile;
      }
      return pile;
    });

    const newCommand = {
      commandType: CommandType.ADD_CARD_TO_FOUNDATION,
      foundationIndex: foundationIndex,
      movedCard: chosenCard,
      previousDrawnCard: undefined,
      previousPileIndex: pileIndex,
      previousTableauIndex: commandTableauIndex
    };
    addNewCommand(newCommand);

    setFoundations(newFoundations);
    const newScore = score - 1;
    setScore(newScore);
  };

  const ableToPlaceCard = (chosenCard: Card, foundationIndex: number): boolean => {
    const foundationPile = foundations[foundationIndex];

    if (foundationPile.length === 0 && foundationIndex < 4 && chosenCard.value === 1) {
      for (let i = 0; i < 4; i++) {
        if (foundations[i].length > 0 && foundations[i][0].suit === chosenCard.suit) {
          return false;
        }
      }
      return true;
    }

    if (foundationPile.length === 0 && foundationIndex > 3 && chosenCard.value === 13) {
      for (let i = 4; i < 8; i++) {
        if (foundations[i].length > 0 && foundations[i][0].suit === chosenCard.suit) {
          return false;
        }
      }
      return true;
    }

    if (foundationPile.length === 0) {
      return false;
    }

    const pileCard = foundationPile[foundationPile.length - 1];
    if (pileCard.suit != chosenCard.suit) {
      return false;
    }
    if (foundationIndex < 4 && pileCard.value === chosenCard.value - 1) {
      return true;
    }
    if (foundationIndex > 3 && pileCard.value === chosenCard.value + 1) {
      return true;
    }

    return false;
  };

  const undoMove = () => {
    const totalNumberOfCommands = commandStack.length;
    if (commandStack.length < 1) {
      return;
    }

    const commandToUndo = commandStack[totalNumberOfCommands - 1];
    switch (commandToUndo.commandType) {
      case CommandType.ADD_CARD_TO_FOUNDATION:
        undoAddCardToFoundation(commandToUndo);
        break;
      case CommandType.DRAW_CARD:
        undoDrawCard(commandToUndo);
        break;
      default:
        break;
    }

    const newCommandStack = commandStack.filter((command, index) => {
      if (index < totalNumberOfCommands - 1) {
        return command;
      }
    });
    setCommandStack(newCommandStack);
  };

  const undoAddCardToFoundation = (commandToUndo: Command) => {
    const newFoundationPile = foundations[commandToUndo.foundationIndex].filter((card, index) => {
      if (index < foundations[commandToUndo.foundationIndex].length - 1) {
        return card;
      }
    });
    const newFoundations = foundations.map((pile, index) => {
      if (index === commandToUndo.foundationIndex) {
        return newFoundationPile;
      }
      return pile;
    });
    setFoundations(newFoundations);

    let newTableauPile: Card[];
    const previousPile = tableau[commandToUndo.previousTableauIndex].map((card) => card);
    let openableTableauIndex = drawnCard?.value || -1;
    if (drawnCard && drawnCard.value < 11) openableTableauIndex--;

    if (commandToUndo.previousTableauIndex === openableTableauIndex && hand.length > 0) {
      const newHand = addCardToArrayAtIndex(
        commandToUndo.movedCard,
        commandToUndo.previousPileIndex,
        hand
      );
      setHand(newHand);
    } else {
      newTableauPile = addCardToArrayAtIndex(
        commandToUndo.movedCard,
        commandToUndo.previousPileIndex,
        previousPile
      );
      const newTableau = tableau.map((pile, index) => {
        if (index === commandToUndo.previousTableauIndex) {
          if (commandToUndo.previousTableauIndex === openableTableauIndex) {
            return [];
          }
          return newTableauPile;
        }
        return pile;
      });
      setTableau(newTableau);
      if (commandToUndo.previousTableauIndex === openableTableauIndex) {
        setHand(newTableauPile);
      }
    }

    const newScore = score + 1;
    setScore(newScore);
  };

  const undoDrawCard = (commandToUndo: Command) => {
    // find the tableau pile that was openable when the card was drawn
    let openableTableauIndex = drawnCard?.value || -1;
    if (drawnCard && drawnCard.value < 11) openableTableauIndex--;

    //find the tableau pile that was openable when the previous card was drawn
    let previousOpenableTableauIndex = commandToUndo.previousDrawnCard?.value || -1;
    if (commandToUndo.previousDrawnCard && commandToUndo.previousDrawnCard.value < 11)
      previousOpenableTableauIndex--;

    // set the
    let newDrawnCardTableau: Card[] = [];
    const currentOpenableTableauLength = tableau[openableTableauIndex].length;
    if (hand.length > 0 && currentOpenableTableauLength > 0) {
      newDrawnCardTableau = tableau[openableTableauIndex].map((card) => card);
    } else if (currentOpenableTableauLength > 1) {
      newDrawnCardTableau = tableau[openableTableauIndex].splice(
        1,
        tableau[openableTableauIndex].length - 1
      );
    } else if (hand.length > 1) {
      newDrawnCardTableau = hand.splice(1, hand.length - 1);
    }

    const newStockPile = tableau[10].map((card) => card);
    newStockPile.push(commandToUndo.movedCard);

    const newTableau = tableau.map((pile, index) => {
      if (index === 10) {
        return newStockPile;
      } else if (index === previousOpenableTableauIndex) {
        return [];
      } else if (index === openableTableauIndex) {
        return newDrawnCardTableau;
      }
      return pile;
    });

    setTableau(newTableau);

    if (commandToUndo.previousDrawnCard) {
      setDrawnCard(commandToUndo.previousDrawnCard);
      if (drawnCard?.value === commandToUndo.previousDrawnCard.value) {
        setHand(newDrawnCardTableau);
      } else {
        setHand(tableau[previousOpenableTableauIndex]);
      }
    } else {
      setDrawnCard(undefined);
      setHand([]);
    }
  };

  const addCardToArrayAtIndex = (
    card: Card,
    indexToAddCardTo: number,
    oldArray: Card[]
  ): Card[] => {
    const newArray = oldArray.filter((card, index) => {
      if (index < indexToAddCardTo) {
        return card;
      }
    });
    newArray.push(card);
    oldArray.map((card, index) => {
      if (index >= indexToAddCardTo) {
        newArray.push(card);
      }
    });
    return newArray;
  };

  const addNewCommand = (newCommand: Command) => {
    const newCommandStack = commandStack.map((command) => command);
    newCommandStack.push(newCommand);
    setCommandStack(newCommandStack);
  };

  useEffect(() => {
    setTableau(dealNewGame());
  }, []);

  return (
    <>
      <ActionBar undoMove={undoMove} />
      <main className={styles.mainContent}>
        <Game
          addCardToFoundation={addCardToFoundation}
          drawCard={drawCard}
          drawnCard={drawnCard}
          foundations={foundations}
          hand={hand}
          openClosePile={openClosePile}
          tableau={tableau}
        />
      </main>
      <Footer score={score}></Footer>
    </>
  );
}
