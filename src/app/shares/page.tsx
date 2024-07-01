'use client'

import { Companies, Company } from '@/types/companies'
import { useEffect, useState } from 'react'
import { calculateShares } from './actions'
import './shares.css'

const SharesPage = () => {
  const [amount, setAmount] = useState(0)
  const [companiesList, setCompaniesList] = useState<Company[]>([])
  const [company, setCompany] = useState<string>('')
  const [oneStock, setOneStock] = useState<{
    cost: number
    currency: string
  } | null>(null)

  useEffect(() => {
    const fetchCompaniesList = async () => {
      const response = await fetch(
        'https://api.twelvedata.com/stocks?exchange=NASDAQ'
      )
      const data = (await response.json()) as Companies
      setCompaniesList(data.data)
    }

    fetchCompaniesList()
  }, [])

  const calculate = async () => {
    const data = await calculateShares(company)
    setOneStock({
      cost: parseFloat(data.values[0].open) * amount,
      currency: data.meta.currency,
    })
  }
  return (
    <div className="stock">
      <h1 className="stock__title">Stock</h1>
      <div className="stock__inputs">
        <input
          type="number"
          className="stock__input"
          placeholder="Shares Amount"
          onChange={(e) => {
            setAmount(parseInt(e.target.value))
          }}
        />
        <input
          type="list"
          list="stock__list-1"
          className="stock__list"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <datalist id="stock__list-1">
          {companiesList.map((item) => {
            return (
              <option value={item.symbol} key={item.symbol}>
                {item.name}
              </option>
            )
          })}
        </datalist>

        <button
          className="stock__btn"
          onClick={() => {
            calculate()
          }}
          disabled={amount === 0 || company === ''}
        >
          calculate
        </button>
      </div>
      <p className="stock__value">
        {oneStock
          ? `${oneStock.cost} ${oneStock.currency}`
          : 'Enter details and calculate'}
      </p>
    </div>
  )
}
export default SharesPage
