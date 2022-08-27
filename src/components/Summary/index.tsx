import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'

import { useSummary } from '../../hooks/useSummary'
import { priceFormatter } from '../../utils/formatter'

import { SummaryCard, SummaryContainer } from './styles'

export function Summary() {
  const {
    summary,
    lastTransactionEntries,
    lastTransactionExpenses,
    transactionsInterval,
  } = useSummary()

  const lastDateEntries =
    lastTransactionEntries === 0
      ? 'Não há transações de entrada'
      : `Última entrada dia ${lastTransactionEntries}`

  const lastDateExpenses =
    lastTransactionExpenses === 0
      ? 'Não há transações de saída'
      : `Última saída dia ${lastTransactionExpenses}`

  const variant = summary.total >= 0 ? 'green' : 'red'

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
        <p>{lastDateEntries}</p>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
        <p>{lastDateExpenses}</p>
      </SummaryCard>

      <SummaryCard variant={variant}>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
        <p>{transactionsInterval}</p>
      </SummaryCard>
    </SummaryContainer>
  )
}
