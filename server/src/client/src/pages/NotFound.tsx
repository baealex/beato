import styled from '@emotion/styled';
import { SecondaryButton } from '~/components/shared';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 1rem;
`;

const Dance = styled.div`
    animation: dance 1.25s infinite ease-in;
    font-size: 2rem;
    font-weight: bold;

    @keyframes dance {
        0% {
            transform: rotate(0deg);
        }
        25% {
            transform: rotate(12deg);
        }
        50% {
            transform: rotate(0deg);
        }
        75% {
            transform: rotate(-12deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }
`;

const Text = styled.div`
    color: #666;
    font-size: 1.25rem;
    margin-top: 1rem;
`;

export default function NotFound() {
    return (
        <Container>
            <Dance>
                {'(㇏(•̀ᵥᵥ•́)ノ)'}
            </Dance>
            <Text>
                why are you here?
            </Text>
            <SecondaryButton onClick={() => location.assign('/')}>
                Go Home
            </SecondaryButton>
        </Container>
    );
}
