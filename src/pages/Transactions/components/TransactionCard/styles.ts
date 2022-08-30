import styled from 'styled-components'

export const TransactionCardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 48% 15% 16% 16% 5%;
  grid-template-areas: 'description value category date delete';
  padding: 1.125rem 2rem;
  border-radius: 6px;
  margin: 0.5rem;
  background: ${(props) => props.theme['gray-700']};

  .description {
    grid-area: description;
    display: flex;
    align-items: center;
  }

  .value {
    grid-area: value;
    display: flex;
    align-items: center;
  }

  .category {
    grid-area: category;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .date {
    grid-area: date;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .delete {
    grid-area: delete;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;

    svg {
      color: ${(props) => props.theme['gray-100']};
    }
  }

  .delete:hover {
    svg {
      color: ${(props) => props.theme['red-300']};
      transition: color 0.5s;
    }
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}
export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`
