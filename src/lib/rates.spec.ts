import {
  calculateSum,
  convertExchangeRate,
  getExchangeRate,
  getUSDExchangeRates,
} from './rates'

const usdRates = {
  EUR: 0.87815,
  GBP: 0.78569,
  CAD: 1.31715,
  INR: 69.3492,
  MXN: 19.2316,
  AUD: 1.43534,
  CNY: 6.88191,
  MYR: 4.13785,
  COP: 3203.18,
}

describe('Rates Lib Module', () => {
  it('getUSDExchangeRates() should return correct data', () => {
    const rates = getUSDExchangeRates()

    expect(rates).toMatchObject(usdRates)
  })
  it('convertExchangeRate() should by default return usd rate', () => {
    const rates = convertExchangeRate() || {}
    const currencyCodes = Object.keys(rates)
    expect(rates).toMatchObject(usdRates)
    expect(currencyCodes).not.toContain('USD')
    expect(currencyCodes).toHaveLength(9)
  })

  it('convertExchangeRate() should convert from euro to dollars correctly', () => {
    const rates = convertExchangeRate('EUR') || {}
    const currencyCodes = Object.keys(rates)
    expect(rates).not.toMatchObject(usdRates)
    expect(currencyCodes).toContain('USD')
    expect(currencyCodes).not.toContain('EUR')
    expect(currencyCodes).toHaveLength(9)
  })

  it('getExchangeRate() should convert from EUR to dollars correctly', () => {
    expect(getExchangeRate('EUR', 'USD')).toEqual(0.87815)
  })

  it('getExchangeRate() should convert from USD to GBP correctly', () => {
    expect(getExchangeRate('USD', 'GBP')).toEqual(0.78569)
  })

  it('getExchangeRate() should convert from EUR to GBP correctly', () => {
    expect(getExchangeRate('EUR', 'GBP')).toEqual(0.89471)
  })

  it('calculateSum() should add 13.12 EUR to 99 GBP correctly', () => {
    expect(
      calculateSum(
        [
          { currency: 'EUR', value: 13.12 },
          { currency: 'GBP', value: 99 },
        ],
        'CAD'
      )
    ).toMatchObject({ currency: 'CAD', value: 185.64 })
  })
})
