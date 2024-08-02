import { z } from 'zod'
import { zfd } from 'zod-form-data'

export const cryptoSchema = zfd.formData({
  amount: zfd.text(z.coerce.number({ message: 'Amount must be a number' })),
  fromCrypto: zfd.text(
    z.string().min(1, { message: 'Crypto currency is required' })
  ),
  toCrypto: zfd.text(z.string().min(1, { message: 'Currency is required' })),
})

export type CryptoSchema = z.infer<typeof cryptoSchema>
