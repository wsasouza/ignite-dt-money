import { useEffect } from 'react'
import { useContextSelector } from 'use-context-selector'
import * as Dialog from '@radix-ui/react-dialog'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

import { TransactionsContext } from '../../contexts/TransactionsContext'
import { categories } from '../../utils/categories'
import { normalizeValueCurrency, unMaskValue } from '../../utils/masks'

import {
  CloseButton,
  Content,
  Overlay,
  SelectCategory,
  TransactionType,
  TransactionTypeButton,
} from './styles'

const newTransactionFormSchema = z.object({
  description: z.string(),
  value: z.string(),
  category: z.string().min(3),
  type: z.enum(['income', 'outcome']),
})

interface NewTransactionModalProps {
  setOpen: (state: boolean) => void
}

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal({ setOpen }: NewTransactionModalProps) {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  const value = watch('value')

  useEffect(() => {
    setValue('value', normalizeValueCurrency(value))
  }, [setValue, value])

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, category, type } = data
    const value = unMaskValue(data.value)

    await createTransaction({
      description,
      category,
      type,
      value,
    })

    reset()
    setOpen(false)
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton asChild onClick={() => reset()}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="text"
            placeholder="Valor"
            required
            {...register('value')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <SelectCategory {...register('category')}>
            <option value="no" hidden>
              Selecione a categoria
            </option>
            {categories.map((category) => {
              return (
                <option key={category.key} value={category.key}>
                  {category.name}
                </option>
              )
            })}
          </SelectCategory>

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
