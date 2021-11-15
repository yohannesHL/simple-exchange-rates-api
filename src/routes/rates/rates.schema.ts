import * as yup from 'yup'

export const currencyCodeSchema = yup.string().length(3).required()

export const convertSchema = yup
  .object()
  .shape({
    from: currencyCodeSchema.label('CurrencyCode path param').required(),
    to: currencyCodeSchema,
    amount: yup.number().required(),
  })
  .required()
