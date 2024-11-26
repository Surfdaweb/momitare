import styles from './footer.module.scss';

export type FooterProps = {
  score: number;
};

export default function Footer({ score }: FooterProps) {
  return (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h2>Score</h2>
          <p>{score}</p>
        </div>
      </div>
    </>
  );
}
