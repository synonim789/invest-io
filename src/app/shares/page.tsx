'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useTransition } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { Companies, Company } from '../../types/companies'
import { SharesSchema, sharesSchema } from '../../validation/shares'
import { calculateShares, SharesState } from './actions'
import './shares.css'

const SharesPage = () => {
  const [companiesList, setCompaniesList] = useState<Company[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [oneStock, setOneStock] = useState<{
    cost: number
    currency: string
  } | null>(null)

  useEffect(() => {
    const fetchCompaniesList = async () => {
      try {
        const response = await fetch(
          'https://api.twelvedata.com/stocks?exchange=NASDAQ'
        )
        const data = (await response.json()) as Companies
        setCompaniesList(data.data)
      } catch (error) {
        setErrorMessage(error.message)
      }
    }

    fetchCompaniesList()
  }, [])

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<SharesSchema>({
    resolver: zodResolver(sharesSchema),
    mode: 'onChange',
    defaultValues: {
      amount: 0,
    },
  })

  const amount = watch('amount')
  const company = watch('company')

  const [state, formAction] = useFormState<SharesState, FormData>(
    calculateShares,
    null
  )

  useEffect(() => {
    if (!state) return
    if (state.error) {
      setErrorMessage(state.error)
      return
    }

    setOneStock({ cost: state.data.cost, currency: state.data.currency })
  }, [state])

  const [isPending, startTransition] = useTransition()

  return (
    <div className="stock">
      <h1 className="stock__title">Stock</h1>
      <form
        className="stock__inputs"
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
            className="stock__input"
            placeholder="Shares Amount"
            {...register('amount')}
          />
          {errors.amount && (
            <p className="stock__error">{errors.amount.message}</p>
          )}
        </div>
        <div>
          <input
            type="list"
            list="stock__list-1"
            className="stock__list"
            placeholder="Company"
            {...register('company')}
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
          {errors.company && (
            <p className="stock__error">{errors.company.message}</p>
          )}
        </div>

        <button
          className="stock__btn"
          disabled={amount === 0 || amount === undefined || company === ''}
        >
          calculate
        </button>
      </form>
      <p className="stock__value">
        {oneStock
          ? `${oneStock.cost} ${oneStock.currency}`
          : isPending
          ? 'Calculating...'
          : 'Enter details and calculate'}
        {errorMessage && <p className="stock__error">{errorMessage}</p>}
      </p>
    </div>
  )
}
export default SharesPage
