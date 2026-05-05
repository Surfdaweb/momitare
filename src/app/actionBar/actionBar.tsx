import styles from './actionBar.module.scss';

export type ActionBarProps = {
  undoMove: () => void;
  startNewGame: () => void;
};

export default function ActionBar({ undoMove, startNewGame }: ActionBarProps) {
  return (
    <>
      <div className={styles.actionBarContainer}>
        <button className={styles.actionBarButton} onClick={undoMove}>
          <img src="/Undo.png" alt="" />
          Undo
        </button>
        <button className={styles.actionBarButton} onClick={startNewGame}>
          <img src="/NewGame.png" alt="" />
          New Game
        </button>
      </div>
    </>
  );
}
