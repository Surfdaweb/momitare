import Footer from './footer/footer';
import Game from './game/game';
import styles from './page.module.css';
import TopNav from './topNav/topNav';

export default function Home() {
  return (
    <>
      <TopNav></TopNav>
      <main className={styles.mainContent}>
        <Game></Game>
      </main>
      <Footer></Footer>
    </>
  );
}
