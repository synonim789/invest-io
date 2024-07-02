'use client'

import { useEffect, useState } from 'react'
import {
  calculateCryptoExchange,
  getAllCryptoCurrencies,
  getLimitedCurrencies,
} from './actions'
import './crypto.css'

const CryptoPage = () => {
  const [amount, setAmount] = useState(0)
  const [fromCrypto, setFromCrypto] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [cryptoList, setCryptoList] = useState<string[]>([])
  const [currencyList, setCurrencyList] = useState<string[]>([])
  const [exchangeValue, setExchangeValue] = useState(0)

  const calculate = async () => {
    const data = await calculateCryptoExchange({
      fromCrypto,
      toCurrency,
      amount,
    })
    setExchangeValue(data)
  }

  useEffect(() => {
    const fetchCryptoList = async () => {
      const data = await getAllCryptoCurrencies()
      setCryptoList(data)
    }

    fetchCryptoList()
  }, [])

  useEffect(() => {
    const fetchCurrencies = async () => {
      const data = await getLimitedCurrencies(fromCrypto)
      setCurrencyList(data)
    }
    fetchCurrencies()
  }, [fromCrypto])

  return (
    <div className="crypto">
      <h1 className="crypto__title">Crypto</h1>
      <div className="crypto__inputs">
        <input
          type="number"
          placeholder="Amount"
          className="crypto__input"
          onChange={(e) => setAmount(parseInt(e.target.value))}
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
          disabled={fromCrypto === '' || toCurrency === '' || amount === 0}
        >
          Calculate
        </button>
      </div>
      <p className="crypto__value">
        {exchangeValue
          ? `${exchangeValue} ${toCurrency}`
          : 'Enter details and calculate'}
      </p>
    </div>
  )
}
export default CryptoPage
