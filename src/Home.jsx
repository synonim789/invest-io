import { Link } from 'react-router-dom'
import './Home.css'
import image from './finance.svg'
const Home = () => {
  return (
    <main className="home">
      <section className="home__section">
        <p className="home__text">
          Welcome to Invest.io - your financial compass to monitor your
          investment portfolio with ease and precision.
        </p>
        <Link to="/shares" className="home__cta">
          Check Now!
        </Link>
      </section>
      <section className="home__section">
        <img
          src={image}
          alt="man showing investments on monitor"
          className="home__image"
        />
      </section>
    </main>
  )
}
export default Home
