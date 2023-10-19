import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './footer.module.scss';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link href={'/write'}>
          <FontAwesomeIcon icon={faPenToSquare}/>
        </Link>
      </div>
    </footer>
  );
}