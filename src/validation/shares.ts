import { z } from 'zod'
import { zfd } from 'zod-form-data'

export const sharesSchema = zfd.formData({
  amount: zfd.text(z.coerce.number({ message: 'amount must be a number' })),
  company: zfd.text(z.string().min(1, { message: 'Company is required' })),
})

export type SharesSchema = z.infer<typeof sharesSchema>
