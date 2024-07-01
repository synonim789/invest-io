'use client'

import { useEffect, useState } from 'react'
import { calculateExchange, getCurrencies } from './actions'
import './currencies.css'

const CurrenciesPage = () => {
  const [amount, setAmount] = useState(0)
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [currrenciesList, setCurrenciesList] = useState<
    | {
        currency_id: number
        currency_short_code: string
      }[]
    | null
  >(null)
  const [calculatedValue, setCalculatedValue] = useState(0)
  const calculate = async () => {
    const data = await calculateExchange({
      amount: amount,
      fromCurrency: fromCurrency,
      toCurrency: toCurrency,
    })
    setCalculatedValue(data.value)
  }

  useEffect(() => {
    const fetchCurrenciesList = async () => {
      const data = await getCurrencies()
      let newCurrenciesList: {
        currency_id: number
        currency_short_code: string
      }[] = []
      let currencies = Object.values(data.response)
      for (const currency of currencies) {
        if (currency.short_code !== undefined) {
          newCurrenciesList.push({
            currency_id: currency.id,
            currency_short_code: currency.short_code,
          })
        }
      }
      setCurrenciesList(newCurrenciesList)
    }
    fetchCurrenciesList()
  }, [])

  return (
    <div className="currrencies">
      <h1 className="currencies__title">Currencies</h1>
      <div className="currencies__inputs">
        <input
          type="number"
          className="currencies__input"
          placeholder="Amount"
          onChange={(e) => {
            setAmount(parseFloat(e.target.value))
          }}
        />
        <input
          type="list"
          className="currencies__list"
          list="currencies__list-1"
          placeholder="From"
          onChange={(e) => {
            setFromCurrency(e.target.value)
          }}
        />
        <datalist id="currencies__list-1">
          {currrenciesList?.map((currency) => {
            return (
              <option
                value={currency.currency_short_code}
                key={currency.currency_id}
              ></option>
            )
          })}
        </datalist>
        <input
          type="list"
          className="currencies__list"
          placeholder="To"
          list="currencies__list-2"
          onChange={(e) => setToCurrency(e.target.value)}
        />
        <datalist id="currencies__list-2">
          {currrenciesList?.map((currency) => {
            return (
              <option
                value={currency.currency_short_code}
                key={`second-${currency.currency_id}`}
              ></option>
            )
          })}
        </datalist>
        <button
          className="currencies__btn"
          onClick={() => {
            calculate()
          }}
          disabled={amount === 0 || toCurrency === '' || fromCurrency === ''}
        >
          Calculate
        </button>
      </div>
      <p className="currencies__value">
        {calculatedValue
          ? `${calculatedValue} ${toCurrency}`
          : 'Enter details and calculate'}
      </p>
    </div>
  )
}
export default CurrenciesPage
