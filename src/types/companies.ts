export type Company = {
  symbol: string
  name: string
  currency: string
  exchange: string
  mic_code: string
  country: string
  type: string
}

export type Companies = {
  data: Company[]
  count: number
  status: string
}
