import styled from '@emotion/styled'

import { Left } from '~/icon'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    height: 60px;
    background-color: #111;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    border-bottom: 1px solid #333;

    button {
        background-color: transparent;
        border: none;
        color: inherit;
        cursor: pointer;
        display: flex;
        align-items: center;

        svg {
            width: 1.25rem;
            height: 1.25rem;
        }
    }
`

export default function SubPageHeader() {
    return (
        <Container>
            <button onClick={() => history.back()}>
                <Left />
            </button>
        </Container>
    )
}