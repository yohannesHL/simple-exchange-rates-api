import { getTotalTransferedBalance } from './transfers.service'

jest.mock('../../lib/rates', () => ({
  calculateSum: jest.fn().mockReturnValue({ currency: 'EUR', value: 42 }),
}))

describe('Transfers service ', () => {
  it('getTotalTransferedBalance() ', async () => {
    const expectedBalance = { currency: 'EUR', value: 42 }
    const result = await getTotalTransferedBalance(['50 GBP', '12 CAD'], 'EUR')
    expect(result).toMatchObject({
      ok: true,
      data: {
        balances: [
          {
            currency: 'GBP',
            value: 50,
          },
          {
            currency: 'CAD',
            value: 12,
          },
        ],
        transferedBalance: expectedBalance,
      },
    })
  })
})
