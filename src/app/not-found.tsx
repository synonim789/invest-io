import Link from 'next/link'
import './notFound.css'
const PageNotFound = () => {
  return (
    <section className="not-found__container">
      <div className="not-found__section">
        <h2 className="not-found__title">404 Page Not Found</h2>
        <p className="not-found__description">
          Could not find requested resource
        </p>
        <Link href="/" className="not-found__link">
          Return Home
        </Link>
      </div>
    </section>
  )
}
export default PageNotFound
