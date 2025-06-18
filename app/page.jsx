import Link from 'next/link';
import styles from './page.module.css';
const Homepage = () => {
  return (
    <div className={styles.homepage}>
      <h2 className={styles.h2}>Go To Login</h2>
      <Link href="/login" className={styles.link}>
        <button className={styles.button}>Login</button>
      </Link>
    </div>
  )
}

export default Homepage