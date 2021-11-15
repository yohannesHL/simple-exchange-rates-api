import {
  allExchangeRates,
  mockedExchangeRateConversion,
} from '../../../test/fixtures/exchangeRates'
import { convertCurrencyAmount, getExchangeRates } from './rates.service'

jest.mock('../../lib/rates', () => ({
  getExchangeRate: jest.fn().mockReturnValue(0.7231),
  convertExchangeRate: jest.fn().mockReturnValue(mockedExchangeRateConversion),
  getUSDExchangeRates: jest.fn().mockReturnValue(allExchangeRates['USD']),
}))

describe('Rates service ', () => {
  it('getExchangeRates() returns expected default result', async () => {
    const result = await getExchangeRates('USD')
    expect(result).toMatchObject({
      ok: true,
      data: {
        baseCurrency: 'USD',
        rates: allExchangeRates['USD'],
      },
    })
  })

  it('getExchangeRates() returns expected result', async () => {
    const result = await getExchangeRates('GBP')
    expect(result).toMatchObject({
      ok: true,
      data: {
        baseCurrency: 'GBP',
        rates: mockedExchangeRateConversion,
      },
    })
  })

  it('convertCurrencyAmount() returns expected result', async () => {
    const result = await convertCurrencyAmount({
      amount: 14,
      from: 'GBP',
      to: 'EUR',
    })
    expect(result).toMatchObject({
      ok: true,
      data: {
        from: {
          currency: 'GBP',
          value: 14,
        },
        to: {
          currency: 'EUR',
          value: 10.1234,
        },
        rate: 0.7231,
      },
    })
  })
})
