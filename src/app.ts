import Koa from 'koa'
import koaBody from 'koa-body'
import json from 'koa-json'
import rates from './routes/rates'
import transfers from './routes/transfers'

const app = new Koa()

app.use(json())
app.use(koaBody())
app.use(rates.routes())
app.use(transfers.routes())

export default app
