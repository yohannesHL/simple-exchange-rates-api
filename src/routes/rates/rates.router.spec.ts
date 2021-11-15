import request from 'supertest'
import app from '../..'
import { allExchangeRates } from '../../../test/fixtures/exchangeRates'

describe('Rates API (e2e)', () => {
  it('GET /rates', () => {
    return request(app.callback())
      .get('/rates')
      .expect(200)
      .then(res => {
        console.log({ data: res.body })
        expect(res.body.ok).toBe(true)
        expect(res.body.data).toMatchObject({
          baseCurrency: 'USD',
          rates: allExchangeRates.USD,
        })
      })
  })

  it('GET /rates/:code should return expected value', () => {
    return request(app.callback())
      .get('/rates/GBP')
      .expect(200)
      .then(res => {
        console.log({ data: res.body })
        expect(res.body.ok).toBe(true)
        expect(res.body.data).toMatchObject({
          baseCurrency: 'GBP',
          rates: allExchangeRates.GBP,
        })
      })
  })

  it('GET /rates/:code with validation error', () => {
    return request(app.callback())
      .get('/rates/CA')
      .expect(200)
      .then(res => {
        console.log({ data: res.body })
        expect(res.body.ok).toBe(false)
        expect(res.body.errors).toHaveLength(1)
      })
  })

  it('GET /rates/EUR/convert returns validation error', () => {
    return request(app.callback())
      .get('/rates/EUR/convert')
      .expect(200)
      .then(res => {
        console.log({ data: res.body })
        expect(res.body.ok).toBe(false)
        expect(res.body.errors).toHaveLength(2)
      })
  })

  it('GET /rates/EUR/convert?to=CAD&amount=78.14 returns valid result', () => {
    return request(app.callback())
      .get('/rates/EUR/convert?to=CAD&amount=78.14')
      .expect(200)
      .then(res => {
        console.log({ data: res.body })
        expect(res.body.ok).toBe(true)
        expect(res.body.data).toMatchObject({
          from: {
            currency: 'EUR',
            value: 78.14,
          },
          to: {
            currency: 'CAD',
            value: 117.2029674,
          },
        })
      })
  })
})
