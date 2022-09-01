import { CalendarBlank, TagSimple, Trash } from 'phosphor-react'
import { categories } from '../../../../utils/categories'
import { dateFormatter, priceFormatter } from '../../../../utils/formatter'

import { PriceHighlight, TransactionCardContainer } from './styles'

interface TransactionCardProps {
  id: number
  description: string
  category: string
  type: 'income' | 'outcome'
  value: number
  createdAt: string
  onDeleteCard: (id: number) => void
}

export function TransactionCard(transaction: TransactionCardProps) {
  const category = categories.find(
    (category) => category.key === transaction.category,
  )

  return (
    <TransactionCardContainer color={category?.color}>
      <span className="description">{transaction.description}</span>

      <PriceHighlight variant={transaction.type} className="value">
        {transaction.type === 'outcome' && '- '}
        {priceFormatter.format(transaction.value)}
      </PriceHighlight>

      <div className="category">
        <TagSimple size={16} weight="fill" />
        <span>{category?.name}</span>
      </div>
      <div className="date">
        <CalendarBlank size={16} color="#7C7C8A" />
        {dateFormatter.format(new Date(transaction.createdAt))}
      </div>
      <button
        className="delete"
        title="Apagar Transação"
        onClick={() => transaction.onDeleteCard(transaction.id)}
      >
        <Trash size={20} />
      </button>
    </TransactionCardContainer>
  )
}
