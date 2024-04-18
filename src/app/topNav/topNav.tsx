import styles from './topNav.module.scss';

export default function TopNav() {
  return (
    <>
      <div className={styles.navContainer}>
        <img src={`/BrandIcon.png`} alt="" />

        <h1>Momitaire</h1>
      </div>
    </>
  );
}
