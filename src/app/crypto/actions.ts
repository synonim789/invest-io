'use server'

import { ZodError } from 'zod'
import { cryptoSchema } from '../../validation/crypto'

export type CryptoState =
  | {
      status: 'success'
      amount: number
    }
  | {
      status: 'error'
      message: string
    }
  | null

export const getAllCryptoCurrencies = async () => {
  const response = await fetch(
    'https://api-pub.bitfinex.com/v2/conf/pub:list:currency'
  )

  const data = (await response.json()) as string[][]
  return data[0]
}

export const getLimitedCurrencies = async (currency: string) => {
  const response = await fetch(
    'https://api-pub.bitfinex.com/v2/conf/pub:list:pair:exchange'
  )
  const data = (await response.json()) as string[][]
  const nestedArr = data[0]
  const result = nestedArr
    .filter((element) => element.startsWith(currency))
    .map((element) => {
      let newElement = element.substring(currency.length)
      if (newElement.startsWith(':')) {
        newElement = newElement.substring(1)
      }
      return newElement
    })
  return result
}

export const calculateCryptoExchange = async (
  prevState: CryptoState,
  data: FormData
): Promise<CryptoState> => {
  try {
    const { amount, fromCrypto, toCrypto } = cryptoSchema.parse(data)

    const response = await fetch('https://api-pub.bitfinex.com/v2/calc/fx', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        ccy1: fromCrypto,
        ccy2: toCrypto,
      }),
    })
    const responseData = (await response.json()) as [number]
    const [numberValue] = responseData
    return { status: 'success', amount: numberValue * amount }
  } catch (err) {
    if (err instanceof ZodError) {
      return { status: 'error', message: 'Invalid form data' }
    }
    return {
      status: 'error',
      message: 'Something went wrong. Please try again.',
    }
  }
}
