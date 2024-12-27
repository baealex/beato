import styled from '@emotion/styled';
import { useStore } from 'badland-react';
import { useState } from 'react';
import { Button } from '~/components/shared';
import { equalizerStore } from '~/store/equalizer';

const Container = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SliderContainer = styled.div`
    width: 100%;
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Label = styled.label`
    margin-bottom: 0.5rem;
    font-weight: bold;
`;

const SliderInput = styled.input`
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    background: #ddd;
    border-radius: 5px;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        background: #4caf50;
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid white;
        transition: background 0.3s;

        &:hover {
            background: #45a049;
        }
    }

    &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background: #4caf50;
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid white;
        transition: background 0.3s;

        &:hover {
            background: #45a049;
        }
    }

    &::-ms-thumb {
        width: 20px;
        height: 20px;
        background: #4caf50;
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid white;
        transition: background 0.3s;

        &:hover {
            background: #45a049;
        }
    }
`;

const Equalizer = () => {
    const [isStabilityModeEnabled] = useState(Boolean(localStorage.getItem('stability-mode::on')));

    const [equalizerState, setEqState] = useStore(equalizerStore);

    const handleSliderChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setEqState((state) => ({
            ...state,
            [name]: Number(e.currentTarget.value)
        }));
    };

    return (
        <Container>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                <Button onClick={() => equalizerStore.reset()}>
                    Reset
                </Button>
            </div>
            {Object.entries(equalizerState).map(([name, value]) => (
                <SliderContainer key={name}>
                    <Label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}:</Label>
                    <SliderInput
                        type="range"
                        name={name}
                        min="-10"
                        max="10"
                        value={value}
                        onChange={handleSliderChange(name)}
                    />
                </SliderContainer>
            ))}
            {isStabilityModeEnabled && (
                <div
                    style={{
                        position: 'fixed',
                        backgroundColor: 'rgba(0, 0, 0, 0.77)',
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 100
                    }}>
                    You're in stability mode.
                </div>
            )}
        </Container>
    );
};

export default Equalizer;
