import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import SideBar from './components/SideBar'
import { useSelector } from 'react-redux'
import Pie from './pages/stats/Pie'
import Chart from './pages/stats/Chart'
import Event from './pages/Event'
import NewEvent from './components/CreateEvent/NewEvent'
import Donate from './pages/Donate'
import BloodUpdate from './components/BloodTypeUpdate/BloodUpdate'
import ChartQuarters from './pages/stats/ChartQuarters'

function App() {
  const { user } = useSelector((state) => state.auth)
  return (
    <>
      <Router>
        <div className='twoSides'>
        {user && 
          <div className='sideBar'>
              <SideBar />
          </div>
        }
          <div className='container'>
            {!user && <Header />}
            <Routes>
              <Route path='/' element={<Events />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/events' element={<Events />} />
              <Route path='/event' element={<Event />} />
              <Route path='/create' element={<NewEvent />} />
              <Route path='/stats/pieBloodType' element={<Pie />} />
              <Route path='/stats/chartCity' element={<Chart />} />
              <Route path='/stats/chartBloodType' element={<ChartQuarters />} />
              <Route path='/donated' element={<Donate />} />
              <Route path='/bloodTypeUpdate' element={<BloodUpdate />} />
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
