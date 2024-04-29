import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Crypto from './pages/CryptoPage/Crypto'
import Currencies from './pages/CurrenciesPage/Currencies'
import Home from './pages/HomePage/Home'
import Shares from './pages/SharesPage/Shares'

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="shares" element={<Shares />} />
          <Route path="currencies" element={<Currencies />} />
          <Route path="crypto" element={<Crypto />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
