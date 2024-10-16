'use server'

import ky from 'ky'
import { ZodError } from 'zod'
import { ExchangeCurrencyResponse } from '../../types/currencies'
import { currenciesSchema } from '../../validation/currencies'

export type CurrenciesState = {
  error: null | string
  data: ExchangeCurrencyResponse | null
}

export const calculateExchange = async (
  prevState: CurrenciesState,
  data: FormData
): Promise<CurrenciesState> => {
  try {
    const { amount, fromCurrency, toCurrency } = currenciesSchema.parse(data)

    const response = await ky(
      `https://api.currencybeacon.com/v1/convert?api_key=${process.env.CURRENCY_API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
    ).json<ExchangeCurrencyResponse>()

    return { error: null, data: response }
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        error: 'Invalid form data',
        data: null,
      }
    }
    return {
      error: 'Something went wrong. Please try again.',
      data: null,
    }
  }
}
