'use server'

import ky from 'ky'
import { ZodError } from 'zod'
import { SharesResponse } from '../../types/shares'
import { sharesSchema } from '../../validation/shares'

export type SharesState = {
  error: null | string
  data: {
    cost: number
    currency: string
  } | null
}

export const calculateShares = async (
  prevState: SharesState,
  data: FormData
): Promise<SharesState> => {
  try {
    const { amount, company } = sharesSchema.parse(data)
    const response = await ky(
      `https://api.twelvedata.com/time_series?symbol=${company}&interval=1min&apikey=${process.env.SHARES_API_KEY}`
    ).json<SharesResponse>()

    const cost = parseFloat(response.values[0].open) * amount
    const currency = response.meta.currency

    return { error: null, data: { cost, currency } }
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        error: 'Invalid form data',
        data: null,
      }
    }
    return {
      error: 'Something went wrong. please try again.',
      data: null,
    }
  }
}
