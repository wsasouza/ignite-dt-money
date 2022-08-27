import { useContextSelector } from 'use-context-selector'

import { TransactionsContext } from '../contexts/TransactionsContext'
import { dateFormatter } from '../utils/formatter'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  value: number
  createdAt: string
}

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  function getLastTransactionDate(
    collection: Transaction[],
    type: 'income' | 'outcome',
  ) {
    const collectionFilttered = collection.filter(
      (transaction) => transaction.type === type,
    )

    if (collectionFilttered.length === 0) return 0

    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collectionFilttered.map((transaction) =>
          new Date(transaction.createdAt).getTime(),
        ),
      ),
    )

    return `${`${lastTransaction.getDate()}`.padStart(
      2,
      '0',
    )} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
  }

  function getTransactionInterval(collection: Transaction[]) {
    const firstTransactionInterval = new Date(
      Math.min.apply(
        Math,
        collection.map((transaction) =>
          new Date(transaction.createdAt).getTime(),
        ),
      ),
    )

    const lastTransactionInterval = new Date(
      Math.max.apply(
        Math,
        collection.map((transaction) =>
          new Date(transaction.createdAt).getTime(),
        ),
      ),
    )

    const validDate = !isNaN(firstTransactionInterval.getDate())

    if (!validDate) return 'Não há transações'

    return `De ${dateFormatter.format(
      firstTransactionInterval,
    )} a ${dateFormatter.format(lastTransactionInterval)}`
  }

  const lastTransactionEntries = getLastTransactionDate(transactions, 'income')

  const lastTransactionExpenses = getLastTransactionDate(
    transactions,
    'outcome',
  )

  const transactionsInterval = getTransactionInterval(transactions)

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.value
        acc.total += transaction.value
      } else {
        acc.outcome += transaction.value
        acc.total -= transaction.value
      }
      return acc
    },
    { income: 0, outcome: 0, total: 0 },
  )

  return {
    summary,
    lastTransactionEntries,
    lastTransactionExpenses,
    transactionsInterval,
  }
}
