import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending
            ? 'navbar__logo pending'
            : isActive
            ? 'navbar__logo active'
            : 'navbar__logo'
        }
      >
        <h1>Invest.io</h1>
      </NavLink>
      <ul className="navbar__list">
        <li className="navbar__item">
          <NavLink
            to="/shares"
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            shares
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/currencies"
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            currencies
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/crypto"
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            crypto
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
export default Navbar
