import { useEffect } from 'react'
import { useState } from 'react'
const Currencies = () => {
  const [amount, setAmount] = useState(0)
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [currrenciesList, setCurrenciesList] = useState([])
  const [calculatedValue, setCalculatedValue] = useState(0)

  const calculate = async () => {
    const response = await fetch(
      `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&places=2`
    )
    const data = await response.json()
    setCalculatedValue(data.result)
  }

  const fetchCurrenciesList = async () => {
    const response = await fetch(`https://api.exchangerate.host/list?places=2`)
    const data = await response.json()
    let currencies = Object.keys(data.rates)
    setCurrenciesList(currencies)
  }

  useEffect(() => {
    fetchCurrenciesList()
  }, [])

  return (
    <div className="currrencies">
      <h1 className="currenices__title">Currencies</h1>
      <div className="currencies__inputs">
        <input
          type="number"
          className="currencies__input"
          placeholder="amount"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value)
          }}
        />
        <input
          type="list"
          className="currencies__list"
          list="currencies__list-1"
          placeholder="from"
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
          placeholder="to"
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
      {calculatedValue > 0 && calculatedValue}
    </div>
  )
}
export default Currencies
