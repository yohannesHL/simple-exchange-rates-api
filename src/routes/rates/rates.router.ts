import { Context } from 'koa'
import Router from 'koa-router'
import { validateSchema } from '../../lib/schema'
import { ConvertCurrencyInput } from './rates.interface'
import { convertSchema, currencyCodeSchema } from './rates.schema'
import { convertCurrencyAmount, getExchangeRates } from './rates.service'

const router = new Router()

router.get('/rates', async (ctx: Context) => {
  ctx.body = await getExchangeRates()
})

router.get('/rates/:baseCurrency', async (ctx: Context) => {
  const [, , baseCurrency] = ctx.path.split('/')
  const hasErrors =
    (await validateSchema(ctx, currencyCodeSchema, baseCurrency)) === false
  if (hasErrors) return

  ctx.body = await getExchangeRates(baseCurrency)
})

router.get('/rates/:baseCurrency/convert', async (ctx: Context) => {
  const [, , baseCurrency] = ctx.path.split('/')
  const payload = convertSchema.cast({
    ...ctx.query,
    from: baseCurrency,
  }) as ConvertCurrencyInput
  const hasErrors =
    (await validateSchema(ctx, convertSchema, payload)) === false
  if (hasErrors) return

  ctx.body = await convertCurrencyAmount(payload)
})

export default router
