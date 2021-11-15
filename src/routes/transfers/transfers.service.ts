import { calculateSum } from '../../lib/rates'

export const getTotalTransferedBalance = async (balances: string[], toCurrency: string) => {
  const accountBalances = balances.filter(Boolean).map((bal) => {
    const [value, currency] = bal.split(' ')
    
    return {
      value: +value,
      currency
   } 
  })
  
  const transferedBalance = await calculateSum(accountBalances, toCurrency)

  
  return {
    ok: true,
    data: {
      balances: accountBalances,
      transferedBalance
    }
  }
}
