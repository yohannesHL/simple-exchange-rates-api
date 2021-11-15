import { ServiceResponse } from '../../lib/interfaces'
import {
  convertExchangeRate,
  getExchangeRate,
  getUSDExchangeRates,
} from '../../lib/rates'
import {
  ConvertCurrencyInput,
  ConvertCurrencyResult,
  ExchangeRateResult,
} from './rates.interface'

export const getExchangeRates = async (
  baseCurrency = 'USD'
): Promise<ServiceResponse<ExchangeRateResult>> => {
  const rates =
    baseCurrency === 'USD'
      ? getUSDExchangeRates()
      : convertExchangeRate(baseCurrency)

  return {
    ok: true,
    data: {
      baseCurrency,
      rates,
    },
  }
}

export const convertCurrencyAmount = async ({
  amount,
  from,
  to,
}: ConvertCurrencyInput): Promise<ServiceResponse<ConvertCurrencyResult>> => {
  const rate = await getExchangeRate(from, to)

  return {
    ok: true,
    data: {
      from: {
        currency: from,
        value: amount,
      },
      to: {
        currency: to,
        value: rate * amount,
      },
      rate,
    },
  }
}
