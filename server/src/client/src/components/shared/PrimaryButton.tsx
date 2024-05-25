import styled from '@emotion/styled';

const PrimaryButton = styled.button`
    padding: 0.5rem;
    border: none;
    background-color: #222;
    border-radius: 0.5rem;
    color: #eee;
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    svg {
        width: 1rem;
        height: 1rem;
    }

    @media (min-width: 1024px) {
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
`;

export default PrimaryButton;