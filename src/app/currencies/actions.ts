'use server'

import { Currencies, ExchangeCurrencyResponse } from '@/types/currencies'

export const getCurrencies = async () => {
  const response = await fetch(
    `https://api.currencybeacon.com/v1/currencies?api_key=${process.env.CURRENCY_API_KEY}&type=fiat`
  )

  const data = await response.json()
  return data as Currencies
}

type Params = {
  fromCurrency: string
  toCurrency: string
  amount: number
}

export const calculateExchange = async ({
  fromCurrency,
  toCurrency,
  amount,
}: Params) => {
  const response = await fetch(
    `https://api.currencybeacon.com/v1/convert?api_key=${process.env.CURRENCY_API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
  )

  const data = await response.json()
  return data as ExchangeCurrencyResponse
}
