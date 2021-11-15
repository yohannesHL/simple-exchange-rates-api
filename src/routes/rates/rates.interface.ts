import { CurrencyAmount } from '../../lib/interfaces';


export interface ExchangeRateResult {
  baseCurrency: string,
  rates: Record<string, number>
}

export interface ConvertCurrencyInput {
  amount: number,
  from: string,
  to: string
}

export interface ConvertCurrencyResult {
  rate: number,
  from: CurrencyAmount,
  to: CurrencyAmount
}


