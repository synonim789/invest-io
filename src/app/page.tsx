import Image from 'next/image'
import Link from 'next/link'
import './home.css'

const HomePage = () => {
  return (
    <main className="home">
      <section className="home__section">
        <p className="home__text">
          Welcome to Invest.io - your financial compass to monitor your
          investment portfolio with ease and precision.
        </p>
        <Link href="shares" className="home__cta">
          Check Now!
        </Link>
      </section>
      <section className="home__section">
        <Image
          src="/finance.svg"
          alt="man showing investments on monitor"
          height={600}
          width={600}
        />
      </section>
    </main>
  )
}
export default HomePage
