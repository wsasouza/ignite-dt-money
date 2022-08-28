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
  FilterContainer,
} from './styles'
import { CaretLeft, CaretRight, Funnel } from 'phosphor-react'

interface PageClickProps {
  selected: number
}

export function Transactions() {
  const [query, setQuery] = useState('')
  const [remountComponent, setRemountComponent] = useState(0)

  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactionsPage
  })

  const fetchTransactionsPage = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactionsPage
    },
  )

  const pageCount = useContextSelector(TransactionsContext, (context) => {
    return context.pageCount
  })

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
          {query ? (
            <FilterContainer>
              <Funnel size={32} weight="fill" color="#7C7C8A" />
              <span>{query}</span>
            </FilterContainer>
          ) : (
            <FilterContainer>
              <Funnel size={32} color="#7C7C8A" />
            </FilterContainer>
          )}
          <SearchForm setQuery={setQuery} setPage={setRemountComponent} />
          <TransactionsTable>
            <tbody>
              {transactions.map((transaction) => {
                return (
                  <tr key={transaction.id}>
                    <td width="50%">{transaction.description}</td>
                    <td>
                      <PriceHighlight variant={transaction.type}>
                        {transaction.type === 'outcome' && '- '}
                        {priceFormatter.format(transaction.value)}
                      </PriceHighlight>
                    </td>
                    <td>{transaction.category}</td>
                    <td>
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
