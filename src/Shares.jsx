import { useEffect, useState } from 'react'
import './Shares.css'
const Shares = () => {
  const [amount, setAmount] = useState(0)
  const [companiesList, setCompaniesList] = useState([])
  const [company, setCompany] = useState([])
  const [oneStock, setOneStock] = useState([])
  const [fullStock, setFullStock] = useState([])

  const fetchCompaniesList = async () => {
    const response = await fetch(
      'https://api.twelvedata.com/stocks?exchange=NASDAQ'
    )
    const data = await response.json()
    setCompaniesList(data.data)
  }

  useEffect(() => {
    fetchCompaniesList()
  }, [])

  const calculate = async () => {
    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${company}&interval=1min&apikey=86dbcb95e5474a85acf713bce107ad14`
    )
    const data = await response.json()
    setOneStock([parseFloat(data.values[0].open), data.meta.currency])
  }

  return (
    <div className="stock">
      <h1 className="stock__title">Stock</h1>
      <div className="stock__inputs">
        <input
          type="number"
          className="stock__input"
          placeholder="shares amount"
          onChange={(e) => {
            setAmount(e.target.value)
          }}
        />
        <input
          type="list"
          list="stock__list-1"
          className="stock__list"
          placeholder="company"
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
        >
          calculate
        </button>
      </div>
      <p className="stock__value">
        {oneStock[0] > 0 && (oneStock[0] * amount).toFixed(2)} {oneStock[1]}
      </p>
    </div>
  )
}
export default Shares
