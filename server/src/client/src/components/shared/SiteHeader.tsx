import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { type LinkProps, Link as RouterLink, useLocation } from 'react-router-dom';

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

const Header = styled.header`
    position: relative;
    height: 60px;
    background-color: #000;
    color: #eee;
    display: flex;
    gap: 5rem;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #333;

    @media (min-width: 1024px) {
        height: 100%;
        border-right: 1px solid #222;
        border-bottom: none;
    }
`;

const Nav = styled.nav`
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;

    &::-webkit-scrollbar {
        display: none;
    }

    &::before {
        content: "";
        position: fixed;
        top: 0;
        right: 0;
        width: 50px;
        height: 59px;
        background: linear-gradient(
            to left,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0) 100%
        );
        z-index: 1;
        pointer-events: none;

        @media (min-width: 1024px) {
            display: none;
        }
    }

    ul {
        display: flex;
        align-items: center;
        list-style: none;
        margin: 0;
        padding: 0 1rem;
        gap: 1rem;

        @media (min-width: 1024px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
        }

        li {
            font-size: 1rem;
            font-weight: bold;
        }
    }
`;

const Link = styled.a<LinkProps>`
    position: relative;
    color: #fff;
    padding: 1rem 0;
    opacity: 0.5;
    text-decoration: none;
    transition: opacity 0.3s ease;

    @media (min-width: 1024px) {
        padding: 0.5rem 0;
    }

    &::after {
        content: "";
        position: absolute;
        transform: scaleX(0);
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #fff;
        transition: transform 0.3s ease;
    }

    &.active {
        opacity: 1;

        &::after {
            transform: scaleX(1);
        }
    }
`;

export default function SiteHeader() {
    const location = useLocation();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;

        if (el) {
            const activeItem = el.querySelector<HTMLAnchorElement>('a.active');

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
        <Header>
            <Nav ref={ref}>
                <ul>
                    {HEADER_ITEMS.map((item) => (
                        <li key={item.name}>
                            <Link as={RouterLink} to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Nav>
        </Header>
    );
}
