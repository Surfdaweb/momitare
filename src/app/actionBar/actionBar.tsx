import styles from './actionbar.module.scss';

export type ActionBarProps = {
  undoMove: () => void;
};

export default function ActionBar({ undoMove }: ActionBarProps) {
  return (
    <>
      <div className={styles.actionBarContainer}>
        <button className={styles.actionBarButton} onClick={undoMove}>
          <img src="/Undo.png" />
          Undo
        </button>
      </div>
    </>
  );
}
