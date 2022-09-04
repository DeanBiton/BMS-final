import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import Event from './pages/Event'
import Create from './pages/Create'
import Stats from './pages/Stats'
import Donations from './components/DeanTests/Donation/Donations'
import Registers from './components/DeanTests/Register/Registers'
function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Registers />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/events' element={<Events />} />
            <Route path='/event' element={<Event />} />
            <Route path='/create' element={<Create />} />
            <Route path='/stats' element={<Stats />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
