import styles from './SiteHeader.module.scss';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HEADER_ITEMS = [
    {
        name: 'Music',
        path: '/'
    },
    {
        name: 'Favorite',
        path: '/favorite'
    },
    {
        name: 'Album',
        path: '/album'
    },
    {
        name: 'Artist',
        path: '/artist'
    },
    {
        name: 'Playlist',
        path: '/playlist'
    },
    {
        name: 'Setting',
        path: '/setting'
    }
];

export default function SiteHeader() {
    const location = useLocation();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;

        if (el) {
            const activeItem = el.querySelector<HTMLAnchorElement>(`a.${styles.active}`);

            if (activeItem) {
                const { left, width } = activeItem.getBoundingClientRect();
                const { width: navWidth } = ref.current.getBoundingClientRect();
                const center = left + width / 2 - navWidth / 2;
                ref.current.scrollBy({
                    left: center,
                    behavior: 'smooth'
                });
            }
        }
    }, [location.pathname]);

    return (
        <header className={styles.header}>
            <nav ref={ref} className={styles.nav}>
                <ul>
                    {HEADER_ITEMS.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className={[
                                    styles.link,
                                    location.pathname === item.path ? styles.active : ''
                                ].join(' ')}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
