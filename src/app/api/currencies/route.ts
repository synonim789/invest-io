import ky from 'ky'
import { Currencies } from '../../../types/currencies'

export const GET = async () => {
  try {
    const response = await ky
      .get(
        `https://api.currencybeacon.com/v1/currencies?api_key=${process.env.CURRENCY_API_KEY}&type=fiat`
      )
      .json<Currencies>()

    return Response.json({ response })
  } catch (error) {
    return Response.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
