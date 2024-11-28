import styled from '@emotion/styled';
import { Button } from '~/components/shared';
import { useBack } from '~/hooks';

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
    opacity: 0.6;
    font-size: 1.25rem;
    margin-top: 1rem;
`;

export default function NotFound() {
    const back = useBack();

    return (
        <Container>
            <Dance>
                {'(㇏(•̀ᵥᵥ•́)ノ)'}
            </Dance>
            <Text>
                Why are you here, huh?
            </Text>
            <Button onClick={back}>
                Take you back
            </Button>
        </Container>
    );
}
