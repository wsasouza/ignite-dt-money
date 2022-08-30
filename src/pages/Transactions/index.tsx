import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import ReactPaginate from 'react-paginate'

import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionsContext } from '../../contexts/TransactionsContext'
// import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'

import {
  // PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
  PaginateContainer,
  InfoContainer,
  FilterContainer,
} from './styles'
import {
  // CalendarBlank,
  CaretLeft,
  CaretRight,
  Funnel,
  // Trash,
} from 'phosphor-react'
import { TransactionCard } from './components/TransactionCard'

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

  const deleteTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransaction
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

  const handleDeleteTransaction = async (id: number) => {
    await deleteTransaction(id)

    setRemountComponent(Math.random())
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
            {transactionsPerPage.map((transaction) => {
              return (
                <TransactionCard
                  key={transaction.id}
                  description={transaction.description}
                  value={transaction.value}
                  type={transaction.type}
                  category={transaction.category}
                  createdAt={transaction.createdAt}
                  id={transaction.id}
                  onDeleteCard={handleDeleteTransaction}
                />
              )
            })}
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
