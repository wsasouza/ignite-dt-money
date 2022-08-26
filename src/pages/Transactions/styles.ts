import styled from 'styled-components'

export const TransactionsContainer = styled.div`
  width: 100%;
  max-width: 70rem;
  margin: 2rem auto 0;
  padding: 0 1.5rem;
`

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 3rem auto 1rem;
  min-height: 2.2rem;
  gap: 0.5rem;

  span {
    font-size: 1rem;
    padding: 8px 16px;
    border-radius: 6px;
    background: ${(props) => props.theme['green-700']};
    color: ${(props) => props.theme['gray-100']};
  }
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
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

export const PaginateContainer = styled.div`
  .pagination {
    margin-top: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .page-item.active .page-link {
    background-color: ${(props) => props.theme['green-700']};
    color: ${(props) => props.theme['gray-100']};
  }

  .page-item.active :focus {
    box-shadow: none;
  }

  .chevron {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5rem;
    color: ${(props) => props.theme['green-700']};
    cursor: pointer;
  }

  .chevron.disabled {
    color: ${(props) => props.theme['gray-600']};
    cursor: not-allowed;
  }

  .chevron :focus {
    box-shadow: none;
  }

  .chevron:not(.disabled):hover {
    color: ${(props) => props.theme['green-500']};
    transition: color 0.5s;
  }

  .page-link {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    min-width: 2.5rem;
    border-radius: 6px;
    color: ${(props) => props.theme['gray-400']};
    background: ${(props) => props.theme['gray-600']};
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }

  .page-link:hover {
    color: ${(props) => props.theme['gray-100']};
    background: ${(props) => props.theme['green-500']};
    transition: 0.5s;
  }

  .break {
    display: none;
  }
`
