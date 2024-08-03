import { z } from 'zod'
import { zfd } from 'zod-form-data'

export const currenciesSchema = zfd.formData({
  amount: zfd.text(z.coerce.number({ message: 'Amount must be a number' })),
  fromCurrency: zfd.text(z.string({ message: 'Currency is required' }).min(1)),
  toCurrency: zfd.text(z.string({ message: 'Currency is required' }).min(1)),
})

export type CurrenciesSchema = z.infer<typeof currenciesSchema>
