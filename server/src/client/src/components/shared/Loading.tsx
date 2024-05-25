import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Container = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes audio-wave {
        0% {
            height: 6px;
            transform: translateY(0px);
            background: #ff8e3a;
        }
    
        25% {
            height: 20px;
            transform: translateY(-5px) scaleY(1.7);
            background: #ed509e;
        }
    
        50% {
            height: 6px;
            transform: translateY(0px);
            background: #9c73f8;
        }
    
        100% {
            height: 6px;
            transform: translateY(0px);
            background: #0fccce;
        }
    }
    
    .sound-wave {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        width: 3.75rem;
        height: 2.5rem;
    }
    
    .sound-wave div {
        height: 2.5rem;
        display: block;
        width: 0.6rem;
        height: 0.4rem;
        border-radius: 0.5rem;
        background: orange;
        animation: audio-wave 2.2s infinite ease-in-out;
    }
    
    .sound-wave div:nth-child(2) {
        left: 11px;
        animation-delay: 0.2s;
    }
    
    .sound-wave div:nth-child(3) {
        left: 22px;
        animation-delay: 0.4s;
    }
    
    .sound-wave div:nth-child(4) {
        left: 33px;
        animation-delay: 0.6s;
    }
    
    .sound-wave div:nth-child(5) {
        left: 44px;
        animation-delay: 0.8s;
    }
    
    .sound-wave div:nth-child(5) {
        left: 55px;
        animation-delay: 1s;
    }
`;

const Loading = () => {
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShouldShow(true);
        }, 100);

        return () => clearTimeout(timeout);
    });

    return (
        shouldShow && (
            <Container>
                <div className="sound-wave">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </Container>
        )
    );
};

export default Loading;
