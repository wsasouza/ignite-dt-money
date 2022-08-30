import styled, { css } from 'styled-components'

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  overflow-x: auto;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;

  @media (max-width: 440px) {
    gap: 1rem;
  }
`

interface SummaryCardProps {
  variant?: 'green' | 'red'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;
  min-width: 17.5rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  p {
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: ${(props) => props.theme['gray-500']};
  }

  ${(props) =>
    props.variant === 'green' &&
    css`
      background: ${props.theme['green-700']};
    `};

  ${(props) =>
    props.variant === 'red' &&
    css`
      background: ${props.theme['red-700']};
    `};

  ${(props) =>
    props.variant &&
    css`
      p {
        color: ${(props) => props.theme['gray-300']};
      }
    `};
`
