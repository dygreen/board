'use client'

import { faHouse, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '@layout/Footer/footer.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
    const pathname = usePathname()

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {pathname !== '/' && (
                    <Link href={'/'} className={styles.homeBtn}>
                        <FontAwesomeIcon icon={faHouse} />
                    </Link>
                )}
                <Link href={'/write'} className={styles.writeBtn}>
                    <FontAwesomeIcon icon={faPlus} />
                </Link>
            </div>
        </footer>
    )
}
