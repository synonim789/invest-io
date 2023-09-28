import { useEffect, useState } from 'react'
import './Crypto.css'

const Crypto = () => {
  const [amount, setAmount] = useState(0)
  const [fromCrypto, setFromCrypto] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [cryptoList, setCryptoList] = useState([])
  const [currencyList, setCurrencyList] = useState([])
  const [exchangeValue, setExchangeValue] = useState(0)

  const fetchCryptoList = async () => {
    const response = await fetch(
      'https://api.exchangerate.host/cryptocurrencies'
    )
    const data = await response.json()
    const crypto = data.cryptocurrencies
    setCryptoList(Object.values(crypto))
  }

  const fetchCurrenciesList = async () => {
    const response = await fetch('https://api.exchangerate.host/list?places=2')
    const data = await response.json()
    let currencies = Object.keys(data.rates)
    setCurrencyList(currencies)
  }

  const calculate = async () => {
    const response = await fetch(
      `https://api.exchangerate.host/convert?from=${fromCrypto}&to=${toCurrency}&amount=${amount}&places=2`
    )
    const data = await response.json()
    setExchangeValue(data.result)
  }

  useEffect(() => {
    fetchCryptoList()
    fetchCurrenciesList()
  }, [])
  return (
    <div className="crypto">
      <h1 className="crypto__title">Crypto</h1>
      <div className="crypto__inputs">
        <input
          type="number"
          placeholder="Amount"
          className="crypto__input"
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="list"
          placeholder="From"
          list="crypto__list-1"
          className="crypto__list"
          onChange={(e) => setFromCrypto(e.target.value)}
        />
        <datalist id="crypto__list-1">
          {cryptoList.map((item) => {
            return (
              <option value={item.symbol} key={item.symbol}>
                {item.name}
              </option>
            )
          })}
        </datalist>
        <input
          type="list"
          placeholder="To"
          list="crypto__list-2"
          className="crypto__list"
          onChange={(e) => setToCurrency(e.target.value)}
        />
        <datalist id="crypto__list-2">
          {currencyList.map((item) => {
            return <option value={item} key={item}></option>
          })}
        </datalist>
        <button
          className="crypto__btn"
          onClick={() => {
            calculate()
          }}
        >
          Calculate
        </button>
      </div>
      <p className="crypto__value">{exchangeValue > 0 && exchangeValue}</p>
    </div>
  )
}
export default Crypto
