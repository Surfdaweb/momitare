import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <h1>Momitaire</h1>
      <main className={styles.mainContent}>
        <button className={styles.startGameBtn}>Start Game</button>
      </main>
    </>
  );
}
