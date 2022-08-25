import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'

import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  value: number
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  type: 'income' | 'outcome'
  category: string
  value: number
}

interface TransactionContextType {
  transactions: Transaction[]
  transactionsPage: Transaction[]
  pageCount: number
  fetchTransactionsPage: (page: number, query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionsPage, setTransactionsPage] = useState<Transaction[]>([])
  const [pageCount, setpageCount] = useState(0)

  const fetchTransactionsPage = useCallback(
    async (page: number = 1, query?: string) => {
      const response = await api.get('transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          _page: page,
          _limit: 5,
          q: query,
        },
      })

      const totalPages = Number(response.headers['x-total-count'])

      setpageCount(Math.ceil(totalPages / 5))

      setTransactionsPage(response.data)
    },
    [],
  )

  const fetchTransactions = useCallback(async () => {
    const response = await api.get('transactions')

    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, category, type, value } = data

      await api.post('transactions', {
        description,
        category,
        type,
        value,
        createdAt: new Date(),
      })

      fetchTransactions()
      fetchTransactionsPage()
    },
    [fetchTransactions, fetchTransactionsPage],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  useEffect(() => {
    fetchTransactionsPage()
  }, [fetchTransactionsPage])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionsPage,
        fetchTransactionsPage,
        pageCount,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
