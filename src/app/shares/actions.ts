'use server'

import { SharesResponse } from '@/types/shares'

export const calculateShares = async (company: string) => {
  const response = await fetch(
    `https://api.twelvedata.com/time_series?symbol=${company}&interval=1min&apikey=${process.env.SHARES_API_KEY}`
  )
  const data = await response.json()
  return data as SharesResponse
}
