import { Routes, Route } from 'react-router-dom'
import { QuoteProvider } from './Context/QuoteContext'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import AllQuotes from './Pages/AllQuotes'
import MyWritings from './Pages/MyWritings'
import AddNew from './Pages/AddNew'
import About from './Pages/About'

//Main Component
function App() {
  return (
    <QuoteProvider>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-quotes" element={<AllQuotes />} />
            <Route path="/my-writings" element={<MyWritings />} />
            <Route path="/add-new" element={<AddNew />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </QuoteProvider>
  )
}

export default App