import { useEffect, useState } from 'react'
import './Crypto.css'

const Crypto = () => {
  const [amount, setAmount] = useState(0)
  const [fromCrypto, setFromCrypto] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [cryptoList, setCryptoList] = useState([])
  const [currencyList, setCurrencyList] = useState([])
  const [exchangeValue, setExchangeValue] = useState(0)

  const calculate = async () => {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${fromCrypto}&tsyms=${toCurrency}`
    )
    const data = await response.json()
    setExchangeValue(data[toCurrency])
  }

  useEffect(() => {
    const fetchCryptoList = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/blockchain/list?api_key=${process.env.REACT_APP_CRYPTO_API_KEY}`
      )
      let data = await response.json()
      let crypto = Object.keys(data.Data)

      setCryptoList(crypto)
    }

    const fetchCurrenciesList = async () => {
      const response = await fetch(
        'https://openexchangerates.org/api/currencies.json'
      )
      const data = await response.json()
      let currencies = Object.keys(data)
      setCurrencyList(currencies)
    }
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
            return <option value={item} key={item}></option>
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
      <p className="crypto__value">
        {exchangeValue > 0 && exchangeValue * amount + ' '}
        {exchangeValue ? toCurrency : ''}
      </p>
    </div>
  )
}
export default Crypto
