import Footer from './footer/footer';
import GameLogic from './gameLogic/gameLogic';
import styles from './page.module.css';
import TopNav from './topNav/topNav';

export default function Home() {
  return (
    <>
      <TopNav></TopNav>
      <main className={styles.mainContent}>
        <GameLogic></GameLogic>
      </main>
      <Footer></Footer>
    </>
  );
}
