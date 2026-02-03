import styles from './SiteHeader.module.scss';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Music, Heart, Disc, User, ListMusic, Gear } from '~/icon';

const HEADER_ITEMS = [
    {
        name: 'Music',
        path: '/',
        icon: Music
    },
    {
        name: 'Favorite',
        path: '/favorite',
        icon: Heart
    },
    {
        name: 'Album',
        path: '/album',
        icon: Disc
    },
    {
        name: 'Artist',
        path: '/artist',
        icon: User
    },
    {
        name: 'Playlist',
        path: '/playlist',
        icon: ListMusic
    },
    {
        name: 'Setting',
        path: '/setting',
        icon: Gear
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
            <div className={styles.logo}>
                <div className={styles.logoIcon}>
                    <Music />
                </div>
                <span>Beato</span>
            </div>
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
                                <item.icon />
                                <span className={styles.label}>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
