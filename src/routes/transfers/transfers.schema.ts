import * as yup from 'yup'
import { currencyCodeSchema } from '../rates/rates.schema'

export const formattedAmountSchema = yup
  .string()
  .matches(
    /\d [A-Z]{3}/,
    'Amount is not in expected "{amount} {currency}" format. ie: "99 GBP"'
  )

export const balanceTransferSchema = yup.object().shape({
  balance: yup
    .mixed()
    .when({
      is: Array.isArray,
      then: yup.array().of(formattedAmountSchema),
      otherwise: formattedAmountSchema,
    })
    .required(),
  toCurrency: currencyCodeSchema,
})
