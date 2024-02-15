import Footer from './footer/footer';
import styles from './page.module.css';
import TopNav from './topNav/topNav';

export default function Home() {
  return (
    <>
      <TopNav></TopNav>
      <main className={styles.mainContent}>
        <button className={styles.startGameBtn}>Start Game</button>
      </main>
      <Footer></Footer>
    </>
  );
}
