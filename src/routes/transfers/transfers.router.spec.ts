import request from 'supertest'
import app from '../..'

describe('Transfers API (e2e)', () => {
  it('GET /transfers with correct inputs', () => {
    return request(app.callback())
      .get('/transfers?balance=13.12%20EUR&balance=99%20GBP&toCurrency=CAD')
      .expect(200)
      .then(res => {
        expect(res.body.ok).toBe(true)
        expect(res.body.data).toMatchObject({
          balances: [{
            currency: 'EUR',
            value: 13.12,
          },{
            currency: 'GBP',
            value: 99,
          }],
          transferedBalance: {
            currency: 'CAD',
            value: 185.64
          }
        })
      })
  })

  it('GET /transfers with only one balance total', () => {
    return request(app.callback())
      .get('/transfers?balance=13.12%20EUR&toCurrency=CAD')
      .expect(200)
      .then(res => {
        expect(res.body.ok).toBe(true)
        expect(res.body.data).toMatchObject({
          balances: [{
            currency: 'EUR',
            value: 13.12,
          }],
          transferedBalance: {
            currency: 'CAD',
            value: 19.68
          }
        })
      })
  })

  it('GET /transfers with invalid inputs', () => {
    return request(app.callback())
      .get('/transfers?balance=13.12EUR&balance=%20GBP&toCurrency=CA')
      .expect(200)
      .then(res => {
        expect(res.body.ok).toBe(false)
        expect(res.body.errors).toHaveLength(3)
      })
  })
})
