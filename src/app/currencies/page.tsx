'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useTransition } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { ExchangeCurrencyResponse } from '../../types/currencies'
import { CurrenciesSchema, currenciesSchema } from '../../validation/currencies'
import { calculateExchange, getCurrencies } from './actions'
import './currencies.css'

const CurrenciesPage = () => {
  const [currrenciesList, setCurrenciesList] = useState<
    | {
        currency_id: number
        currency_short_code: string
      }[]
    | null
  >(null)
  const [calculatedValue, setCalculatedValue] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<CurrenciesSchema>({
    resolver: zodResolver(currenciesSchema),
    mode: 'onChange',
  })

  const amount = watch('amount')
  const toCurrency = watch('toCurrency')
  const fromCurrency = watch('fromCurrency')

  const [state, formAction] = useFormState<ExchangeCurrencyResponse, FormData>(
    calculateExchange,
    null
  )
  const [isPending, startTransition] = useTransition()

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

  useEffect(() => {
    if (!state) return
    setCalculatedValue(state.value)
  }, [state])

  return (
    <div className="currrencies">
      <h1 className="currencies__title">Currencies</h1>
      <form
        className="currencies__inputs"
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
            type="number"
            className="currencies__input"
            placeholder="Amount"
            {...register('amount')}
          />
          {errors.amount && (
            <p className="currencies__error">{errors.amount.message}</p>
          )}
        </div>
        <div>
          <input
            type="list"
            className="currencies__list"
            list="currencies__list-1"
            placeholder="From"
            {...register('fromCurrency')}
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
          {errors.fromCurrency && (
            <p className="currencies__error">{errors.fromCurrency.message}</p>
          )}
        </div>
        <div>
          <input
            type="list"
            className="currencies__list"
            placeholder="To"
            list="currencies__list-2"
            {...register('toCurrency')}
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
          {errors.toCurrency && (
            <p className="currencies__error">{errors.toCurrency.message}</p>
          )}
        </div>

        <button
          className="currencies__btn"
          disabled={amount === 0 || toCurrency === '' || fromCurrency === ''}
        >
          Calculate
        </button>
      </form>
      <p className="currencies__value">
        {calculatedValue
          ? `${calculatedValue} ${toCurrency}`
          : isPending
          ? 'Calculating...'
          : 'Enter details and calculate'}
      </p>
    </div>
  )
}
export default CurrenciesPage
