'use server'

import { ZodError } from 'zod'
import { Currencies, ExchangeCurrencyResponse } from '../../types/currencies'
import { currenciesSchema } from '../../validation/currencies'

export type CurrenciesState =
  | {
      status: 'success'
      data: ExchangeCurrencyResponse
    }
  | {
      status: 'error'
      message: string
    }
  | null

export const getCurrencies = async () => {
  const response = await fetch(
    `https://api.currencybeacon.com/v1/currencies?api_key=${process.env.CURRENCY_API_KEY}&type=fiat`
  )

  const data = await response.json()
  return data as Currencies
}

export const calculateExchange = async (
  prevState: CurrenciesState,
  data: FormData
): Promise<CurrenciesState> => {
  try {
    const { amount, fromCurrency, toCurrency } = currenciesSchema.parse(data)

    const response = await fetch(
      `https://api.currencybeacon.com/v1/convert?api_key=${process.env.CURRENCY_API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
    )

    const responseData = await response.json()
    return { status: 'success', data: responseData as ExchangeCurrencyResponse }
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        status: 'error',
        message: 'Invalid form data',
      }
    }
    return {
      status: 'error',
      message: 'Something went wrong. Please try again.',
    }
  }
}
