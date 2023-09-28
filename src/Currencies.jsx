import { useEffect } from 'react'
import { useState } from 'react'
import './Currencies.css'

const Currencies = () => {
  const [amount, setAmount] = useState(0)
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [currrenciesList, setCurrenciesList] = useState([])
  const [calculatedValue, setCalculatedValue] = useState(0)

  const calculate = async () => {
    const response = await fetch(
      `https://api.currencybeacon.com/v1/convert?api_key=DfdCoil2zWoQ4iEsdKleA1OtANRNe6Oo&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
    )
    const data = await response.json()
    setCalculatedValue(data.value.toFixed(2))
  }

  const fetchCurrenciesList = async () => {
    const response = await fetch(
      `https://api.currencybeacon.com/v1/currencies?api_key=DfdCoil2zWoQ4iEsdKleA1OtANRNe6Oo&type=fiat`
    )
    const data = await response.json()
    let currencies = Object.values(data)
    currencies.map((currency) => {
      setCurrenciesList((oldArray) => [...oldArray, currency.short_code])
    })
  }

  useEffect(() => {
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
            setAmount(e.target.value)
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
          {currrenciesList.map((currency) => {
            return <option value={currency} key={currency}></option>
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
          {currrenciesList.map((currency) => {
            return <option value={currency} key={currency}></option>
          })}
        </datalist>
        <button
          className="currencies__btn"
          onClick={() => {
            calculate()
          }}
        >
          Calculate
        </button>
      </div>
      <p className="currencies__value">
        {calculatedValue > 0 && calculatedValue + ' '}
        {toCurrency && toCurrency}
      </p>
    </div>
  )
}
export default Currencies
