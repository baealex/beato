import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { appShell } from '~/config/app-shell';

const NAVIGATION_GROUPS = [
    {
        id: 'primary',
        items: appShell.navigation.primary
    },
    {
        id: 'utility',
        items: appShell.navigation.utility
    }
];

export default function SiteHeader() {
    const location = useLocation();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;

        if (el) {
            const activeItem = el.querySelector<HTMLAnchorElement>(`a.${'ow-site-header-active'}`);

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
        <header className={'ow-site-header-header'}>
            <nav ref={ref} className={'ow-site-header-nav'} aria-label={`${appShell.brand.name} navigation`}>
                {NAVIGATION_GROUPS.map((group) => (
                    <div
                        key={group.id}
                        className={[
                            'ow-site-header-group',
                            group.id === 'utility' ? 'ow-site-header-utilityGroup' : ''
                        ].join(' ')}>
                        <ul>
                            {group.items.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        to={item.path}
                                        className={[
                                            'ow-site-header-link',
                                            isActive(item.path) ? 'ow-site-header-active' : ''
                                        ].join(' ')}>
                                        <item.icon />
                                        <span className={'ow-site-header-label'}>{item.label}</span>
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
