import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CalendarBlank, TagSimple, Trash, X } from 'phosphor-react'

import { categories } from '../../../../utils/categories'
import { dateFormatter, priceFormatter } from '../../../../utils/formatter'

import {
  CancelButton,
  CloseButton,
  DeleteButton,
  DialogAction,
  DialogContent,
  DialogDescription,
  Overlay,
  PriceHighlight,
  TransactionCardContainer,
} from './styles'

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
  const [open, setOpen] = useState(false)

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
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="delete" title="Apagar Transação">
            <Trash size={20} />
          </button>
        </Dialog.Trigger>
        <Overlay />
        <DialogContent>
          <Dialog.Title>Apagar transação</Dialog.Title>
          <CloseButton asChild>
            <X size={24} />
          </CloseButton>
          <DialogDescription>
            Tem certeza que deseja apagar essa transação?
          </DialogDescription>
          <DialogAction>
            <CancelButton>Cancelar</CancelButton>
            <DeleteButton
              onClick={() => transaction.onDeleteCard(transaction.id)}
            >
              Confirmar
            </DeleteButton>
          </DialogAction>
        </DialogContent>
      </Dialog.Root>
    </TransactionCardContainer>
  )
}
