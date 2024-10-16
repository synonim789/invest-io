'use server'

import ky from 'ky'
import { ZodError } from 'zod'
import { cryptoSchema } from '../../validation/crypto'

export type CryptoState = {
  error: string | null
  amount: number | null
}

export const calculateCryptoExchange = async (
  prevState: CryptoState,
  data: FormData
): Promise<CryptoState> => {
  try {
    const { amount, fromCrypto, toCrypto } = cryptoSchema.parse(data)

    const response = await ky
      .post('https://api-pub.bitfinex.com/v2/calc/fx', {
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        json: {
          ccy1: fromCrypto,
          ccy2: toCrypto,
        },
      })
      .json<[number]>()

    const [numberValue] = response
    return { error: null, amount: numberValue * amount }
  } catch (err) {
    if (err instanceof ZodError) {
      return { error: 'Invalid form data', amount: null }
    }
    return {
      error: 'Something went wrong. Please try again.',
      amount: null,
    }
  }
}
