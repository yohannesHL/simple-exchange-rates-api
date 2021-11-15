import { CurrencyAmount } from "./interfaces";

const exchangeRates = {
    USD: {
      EUR: 0.87815,
      GBP: 0.78569,
      CAD: 1.31715,
      INR: 69.3492,
      MXN: 19.2316,
      AUD: 1.43534,
      CNY: 6.88191,
      MYR: 4.13785,
      COP: 3203.18
    }
}

export const globalMaxDecimalPlaces = 4;

export const USDCurrencyCode = 'USD'
  
export const getUSDExchangeRates = ():  Record<string, number> => exchangeRates['USD']

export const convertExchangeRate = (baseCurrency = USDCurrencyCode) => {
    const usdRates = getUSDExchangeRates()
    if (baseCurrency === USDCurrencyCode) return usdRates

    const usdXRate: number = usdRates[baseCurrency]
    const xRateMultiplier = 1 / usdXRate

    return Object.keys(usdRates).reduce((rates:  Record<string, number>, code) => {
        const shouldSwapWithUSDRate = code === baseCurrency
        const key = shouldSwapWithUSDRate ? USDCurrencyCode : code
        const newXRate: number = shouldSwapWithUSDRate ? usdXRate : usdRates[code] * xRateMultiplier
        const maxDigits = (usdRates[code] || usdXRate).toString().split('.')[1].length
        
        rates[key] = toPrecision(newXRate, maxDigits)

        return rates
    },{}) 
}

export const getExchangeRate = (baseCurrency: string, quoteCurrency: string) => {

    if (baseCurrency === USDCurrencyCode) return getUSDExchangeRates()[quoteCurrency]

    // convert to another base currency (not USD) given initial data
    const newXRates = convertExchangeRate(baseCurrency) || {}

    return newXRates[quoteCurrency]
}
 
const toPrecision = (amount: number, decimals: number = 2)=> parseFloat(amount.toFixed(decimals))

const getDecimalDigits = (amount: number | string): number => {
    return (typeof amount === 'number' ? amount.toString().split('.')[1]?.length : amount.length) || 0
}


export const calculateSum = (inputs: CurrencyAmount[], desiredCurrency: string): CurrencyAmount => {
     
    const maxDigits = Math.min( globalMaxDecimalPlaces, Math.max(...inputs.map(amount=> getDecimalDigits(amount.value))))
    const sumResult = inputs.reduce((sum, amount) => sum + amount.value * getExchangeRate(amount.currency, desiredCurrency), 0)
  
    return {
        currency: desiredCurrency,
        value: toPrecision(sumResult, maxDigits)
    }
 }