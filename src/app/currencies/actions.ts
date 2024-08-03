'use server'

import { Currencies, ExchangeCurrencyResponse } from '../../types/currencies'
import { currenciesSchema } from '../../validation/currencies'

export const getCurrencies = async () => {
  const response = await fetch(
    `https://api.currencybeacon.com/v1/currencies?api_key=${process.env.CURRENCY_API_KEY}&type=fiat`
  )

  const data = await response.json()
  return data as Currencies
}

export const calculateExchange = async (
  prevState: ExchangeCurrencyResponse,
  data: FormData
) => {
  const { success, data: parsedData, error } = currenciesSchema.safeParse(data)
  if (success) {
    try {
      const amount = parsedData.amount
      const fromCurrency = parsedData.fromCurrency
      const toCurrency = parsedData.toCurrency

      const response = await fetch(
        `https://api.currencybeacon.com/v1/convert?api_key=${process.env.CURRENCY_API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      )

      const responseData = await response.json()
      return responseData as ExchangeCurrencyResponse
    } catch (error) {
      throw new Error('Error while calculating currency price')
    }
  } else {
    console.error('Validation failed:', error)
    throw new Error('Validation failed.')
  }
}
