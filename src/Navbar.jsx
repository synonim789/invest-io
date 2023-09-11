import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <h1>Invest.io</h1>
      </Link>
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
      <div className="navbar__hamburger"></div>
    </nav>
  )
}
export default Navbar
