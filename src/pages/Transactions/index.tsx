import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import ReactPaginate from 'react-paginate'

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'

import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
  PaginateContainer,
  InfoContainer,
  FilterContainer,
} from './styles'
import { CalendarBlank, CaretLeft, CaretRight, Funnel } from 'phosphor-react'

interface PageClickProps {
  selected: number
}

export function Transactions() {
  const [query, setQuery] = useState('')
  const [remountComponent, setRemountComponent] = useState(0)

  const transactionsPerPage = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.transactionsPage
    },
  )

  const fetchTransactionsPage = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactionsPage
    },
  )

  const pageCount = useContextSelector(TransactionsContext, (context) => {
    return context.pageCount
  })

  const quantityTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.quantityTransactions
    },
  )

  const quantityTransactionsDisplay = (quantityTransactions: number) => {
    if (quantityTransactions === 0) return 'Não há transações'
    else if (quantityTransactions === 1) {
      return `Transações: ${`${quantityTransactions}`.padStart(2, '0')} item`
    } else
      return `Transações: ${`${quantityTransactions}`.padStart(2, '0')} itens`
  }

  const handlePageClick = async ({ selected }: PageClickProps) => {
    const currentPage = selected + 1

    await fetchTransactionsPage(currentPage, query)
  }

  return (
    <div>
      <Header />
      <Summary />

      <div key={remountComponent}>
        <TransactionsContainer>
          <InfoContainer>
            <FilterContainer variant={query}>
              {query ? (
                <Funnel size={32} weight="fill" color="#7C7C8A" />
              ) : (
                <Funnel size={32} color="#7C7C8A" />
              )}
              <span>{query}</span>
            </FilterContainer>

            <span>{quantityTransactionsDisplay(quantityTransactions)}</span>
          </InfoContainer>

          <SearchForm setQuery={setQuery} setPage={setRemountComponent} />
          <TransactionsTable>
            <tbody>
              {transactionsPerPage.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td width="45%">{transaction.description}</td>
                    <td>
                      <PriceHighlight variant={transaction.type}>
                        {transaction.type === 'outcome' && '- '}
                        {priceFormatter.format(transaction.value)}
                      </PriceHighlight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>
                      <CalendarBlank size={16} color="#7C7C8A" />
                      {dateFormatter.format(new Date(transaction.createdAt))}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </TransactionsTable>
          <PaginateContainer>
            <ReactPaginate
              previousLabel={<CaretLeft size={24} weight="bold" />}
              nextLabel={<CaretRight size={24} weight="bold" />}
              breakClassName={'break'}
              pageCount={pageCount}
              marginPagesDisplayed={0}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'chevron'}
              previousLinkClassName={'chevron-link'}
              nextClassName={'chevron'}
              nextLinkClassName={'chevron-link'}
              activeClassName={'active'}
            />
          </PaginateContainer>
        </TransactionsContainer>
      </div>
    </div>
  )
}
