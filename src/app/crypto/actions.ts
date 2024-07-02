'use server'

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

type Params = {
  fromCrypto: string
  toCurrency: string
  amount: number
}

export const calculateCryptoExchange = async ({
  fromCrypto,
  toCurrency,
  amount,
}: Params) => {
  console.log(fromCrypto.length, toCurrency.length)
  const response = await fetch('https://api-pub.bitfinex.com/v2/calc/fx', {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      ccy1: fromCrypto,
      ccy2: toCurrency,
    }),
  })
  const data = (await response.json()) as [number]
  console.log(data)
  const [numberValue] = data
  return numberValue * amount
}
