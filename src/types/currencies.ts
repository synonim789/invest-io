export type Currency = {
  id: number
  name: string
  short_code: string
  code: string
  precision: number
  subunit: number
  symbol: string
  symbol_first: string
  decimal_mark: string
  thousands_separator: string
}
type Meta = {
  code: string
  disclaimer: string
}

export type Currencies = {
  meta: Meta
  response: Currency[]
  [key: string]: Currency | Meta | Currency[]
}

export type ExchangeCurrencyResponse = {
  meta: Meta
  response: {
    timestamp: number
    date: string
    from: string
    to: string
    amount: number
    value: number
  }
  timestamp: number
  date: string
  from: string
  to: string
  amount: number
  value: number
}
