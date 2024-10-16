'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import ky from 'ky'
import { useEffect, useState, useTransition } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CryptoSchema, cryptoSchema } from '../../validation/crypto'
import { CryptoState, calculateCryptoExchange } from './actions'
import './crypto.css'

const CryptoPage = () => {
  const [cryptoList, setCryptoList] = useState<string[]>([])
  const [currencyList, setCurrencyList] = useState<string[]>([])
  const [exchangeValue, setExchangeValue] = useState<number | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<CryptoSchema>({
    resolver: zodResolver(cryptoSchema),
    mode: 'onChange',
  })

  const amount = watch('amount')
  const fromCrypto = watch('fromCrypto')
  const toCurrency = watch('toCrypto')

  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const { data } = await ky
          .get('/api/crypto/all')
          .json<{ data: string[] }>()
        setCryptoList(data)
      } catch (error) {
        setErrorMessage(error.error)
      }
    }

    fetchCryptoList()
  }, [])

  useEffect(() => {
    if (!fromCrypto) return
    const fetchCurrencies = async () => {
      try {
        const data = await ky
          .get(`/api/crypto/limited/${fromCrypto}`)
          .json<string[]>()
        setCurrencyList(data)
      } catch (error) {
        setErrorMessage(error.error)
      }
    }
    fetchCurrencies()
  }, [fromCrypto])

  const [state, formAction] = useFormState<CryptoState, FormData>(
    calculateCryptoExchange,
    null
  )

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!state) {
      return
    }

    if (state.error) {
      setErrorMessage(state.error)
      return
    }

    setExchangeValue(state.amount)
  }, [state])

  return (
    <div className="crypto">
      <h1 className="crypto__title">Crypto</h1>
      <form
        className="crypto__inputs"
        action={(formData) =>
          startTransition(() => {
            try {
              formAction(formData)
            } catch (error) {
              setErrorMessage(error.message)
            }
          })
        }
      >
        <div>
          <input
            {...register('amount')}
            type="number"
            placeholder="Amount"
            className="crypto__input"
          />
          {errors.amount && (
            <p className="crypto__error">{errors.amount.message}</p>
          )}
        </div>
        <div>
          <input
            {...register('fromCrypto')}
            type="list"
            placeholder="From"
            list="crypto__list-1"
            className="crypto__list"
          />
          <datalist id="crypto__list-1">
            {cryptoList.map((item) => {
              return <option value={item} key={item}></option>
            })}
          </datalist>
          {errors.fromCrypto && (
            <p className="crypto__error">{errors.fromCrypto.message}</p>
          )}
        </div>
        <div>
          <input
            {...register('toCrypto')}
            type="list"
            placeholder="To"
            list="crypto__list-2"
            className="crypto__list"
          />
          <datalist id="crypto__list-2">
            {currencyList.map((item) => {
              return <option value={item} key={item}></option>
            })}
          </datalist>
          {errors.toCrypto && (
            <p className="crypto__error">{errors.toCrypto.message}</p>
          )}
        </div>

        <button
          className="crypto__btn"
          disabled={fromCrypto === '' || toCurrency === '' || amount === 0}
        >
          Calculate
        </button>
      </form>
      <p className="crypto__value">
        {exchangeValue
          ? `${exchangeValue} ${toCurrency}`
          : isPending
          ? 'Calculating...'
          : 'Enter details and calculate'}
      </p>
      {errorMessage && <p className="crypto__error">{errorMessage}</p>}
    </div>
  )
}
export default CryptoPage
