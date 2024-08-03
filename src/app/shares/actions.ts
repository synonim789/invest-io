'use server'

import { ZodError } from 'zod'
import { SharesResponse } from '../../types/shares'
import { sharesSchema } from '../../validation/shares'

export type SharesState =
  | {
      status: 'success'
      cost: number
      currency: string
    }
  | {
      status: 'error'
      message: string
    }
  | null

export const calculateShares = async (
  prevState: SharesState,
  data: FormData
): Promise<SharesState> => {
  try {
    const { amount, company } = sharesSchema.parse(data)
    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${company}&interval=1min&apikey=${process.env.SHARES_API_KEY}`
    )
    const responseData = (await response.json()) as SharesResponse
    const cost = parseFloat(responseData.values[0].open) * amount
    const currency = responseData.meta.currency

    return { status: 'success', cost, currency }
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        status: 'error',
        message: 'Invalid form data',
      }
    }
    return {
      status: 'error',
      message: 'Something went wrong. please try again.',
    }
  }
}
