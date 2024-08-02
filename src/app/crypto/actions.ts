'use server'

import { cryptoSchema } from '../../validation/crypto'

export const getAllCryptoCurrencies = async () => {
  try {
    const response = await fetch(
      'https://api-pub.bitfinex.com/v2/conf/pub:list:currency'
    )

    const data = (await response.json()) as string[][]
    return data[0]
  } catch (error) {
    console.error('Failed to fetch crypto currencies:', error)
    throw new Error('Failed to fetch crypto currencies')
  }
}

export const getLimitedCurrencies = async (currency: string) => {
  try {
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
  } catch (error) {
    console.error('Failed to fetch currencies:', error)
    throw new Error('Failed to fetch currencies.')
  }
}

export const calculateCryptoExchange = async (
  prevState: { amount: number } | null,
  data: FormData
) => {
  const { success, data: parseData } = cryptoSchema.safeParse(data)
  if (success) {
    const { amount, fromCrypto, toCrypto } = parseData
    try {
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

      return { amount: numberValue * amount }
    } catch (error) {
      console.error('Failed to calculate exchange:', error)
      throw new Error('Failed to calculate exchange.')
    }
  } else {
    console.log('Validation failed:', parseData)
    console.log('Validation failed.')
  }
}
