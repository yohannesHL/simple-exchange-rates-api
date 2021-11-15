import { Context } from 'koa'
import Router from 'koa-router'
import { validateSchema } from '../../lib/schema'
import { balanceTransferSchema } from './transfers.schema'
import { getTotalTransferedBalance } from './transfers.service'

const router = new Router()

router.get('/transfers', async (ctx: Context) => {
  const { balance, toCurrency = '' } = balanceTransferSchema.cast(ctx.query)
  const hasErrors =
    (await validateSchema(ctx, balanceTransferSchema, {
      balance,
      toCurrency,
    })) === false
  if (hasErrors) return

  const balances = Array.isArray(balance) ? balance : [balance]

  ctx.body = await getTotalTransferedBalance(balances, toCurrency)
})

export default router
