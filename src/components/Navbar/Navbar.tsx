'use client'

import Link from 'next/link'
import { useState } from 'react'
import './Navbar.css'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const changeNavbarState = () => {
    setOpen(!open)
  }
  return (
    <nav className="navbar">
      <Link href="/" className="navbar__logo">
        <h1>Invest.io</h1>
      </Link>
      <ul
        className={
          'navbar__list' + (open === true ? ' navbar__list--active' : '')
        }
      >
        <li className="navbar__item">
          <Link href="/shares" onClick={() => changeNavbarState()}>
            shares
          </Link>
        </li>
        <li className="navbar__item">
          <Link href="/currencies" onClick={() => changeNavbarState()}>
            currencies
          </Link>
        </li>
        <li className="navbar__item">
          <Link href="/crypto" onClick={() => changeNavbarState()}>
            crypto
          </Link>
        </li>
      </ul>
      <div
        className={
          'navbar__hamburger' +
          (open === true ? ' navbar__hamburger--active' : '')
        }
        onClick={() => changeNavbarState()}
      >
        <div className="navbar__hamburger-bar"></div>
        <div className="navbar__hamburger-bar"></div>
        <div className="navbar__hamburger-bar"></div>
      </div>
    </nav>
  )
}
export default Navbar
