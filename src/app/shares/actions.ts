'use server'

import { SharesResponse } from '../../types/shares'
import { sharesSchema } from '../../validation/shares'

export const calculateShares = async (
  prevState: { cost: number; currency: string },
  data: FormData
) => {
  const { success, data: parsedData, error } = sharesSchema.safeParse(data)
  if (success) {
    const { amount, company } = parsedData
    try {
      const response = await fetch(
        `https://api.twelvedata.com/time_series?symbol=${company}&interval=1min&apikey=${process.env.SHARES_API_KEY}`
      )

      const responseData = (await response.json()) as SharesResponse

      const cost = parseFloat(responseData.values[0].open) * amount

      const currency = responseData.meta.currency
      return { cost, currency }
    } catch (error) {
      throw new Error('Error while calculating share price')
    }
  } else {
    console.error('Validation failed:', error)
    throw new Error('Validation failed.')
  }
}
