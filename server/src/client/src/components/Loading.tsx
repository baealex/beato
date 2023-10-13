import styled from '@emotion/styled'
import { theme } from '@baejino/style'
import { useEffect, useState } from 'react'

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

    .spinner {
        animation: spin 0.75s infinite ease;
        border: 3px solid transparent;
        border-color: ${theme.COLOR_PURPLE_PROMINENT} transparent;
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }
`

const Loading = () => {
    const [shouldShow, setShouldShow] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShouldShow(true)
        }, 100)

        return () => clearTimeout(timeout)
    })

    return (
        shouldShow && (
            <Container>
                <div className="spinner" />
            </Container>
        )
    )
}

export default Loading
