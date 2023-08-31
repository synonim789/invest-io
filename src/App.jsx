import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Currencies from './Currencies'
import Home from './Home'
import Navbar from './Navbar'
import Shares from './Shares'
import Crypto from './Crypto'

function App() {
  return (
    <div className="App">
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
