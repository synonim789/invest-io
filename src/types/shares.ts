type Meta = {
  currency: string
  exchange: string
  exchange_timezone: string
  interval: string
  mic_code: string
  symbol: string
  type: string
}

type Value = {
  close: string
  datetime: string
  high: string
  low: string
  open: string
  volume: string
}

export type SharesResponse = {
  meta: Meta
  status: string
  values: Value[]
}
