import styles from './SiteHeader.module.scss';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { appShell } from '~/config/app-shell';

const NAVIGATION_GROUPS = [
    {
        id: 'primary',
        label: 'Listen',
        items: appShell.navigation.primary
    },
    {
        id: 'utility',
        label: 'System',
        items: appShell.navigation.utility
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
                const { left: navLeft, width: navWidth } = el.getBoundingClientRect();
                const center = left - navLeft + width / 2 - navWidth / 2;
                el.scrollBy({
                    left: center,
                    behavior: 'smooth'
                });
            }
        }
    }, [location.pathname]);

    const isActive = (path: string) => {
        if (path === '/') {
            return location.pathname === path;
        }

        return location.pathname.startsWith(path);
    };

    return (
        <header className={styles.header}>
            <nav ref={ref} className={styles.nav} aria-label={`${appShell.brand.name} navigation`}>
                {NAVIGATION_GROUPS.map((group) => (
                    <div
                        key={group.id}
                        className={[
                            styles.group,
                            group.id === 'utility' ? styles.utilityGroup : ''
                        ].join(' ')}>
                        <span className={styles.groupLabel}>{group.label}</span>
                        <ul>
                            {group.items.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        to={item.path}
                                        className={[
                                            styles.link,
                                            isActive(item.path) ? styles.active : ''
                                        ].join(' ')}>
                                        <item.icon />
                                        <span className={styles.label}>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </header>
    );
}
