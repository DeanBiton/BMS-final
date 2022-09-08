import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import Create from './pages/Create'
import Stats from './pages/Stats'
import SignInSide from './pages/SignInSide'
import Test from './pages/test'
import SideBar from './components/SideBar'
import { useSelector, useDispatch } from 'react-redux'
import Pie from './pages/stats/Pie'
import Chart from './pages/stats/Chart'
import Event from './pages/Event'
import NewEvent from './components/CreateEvent/NewEvent'
import DonateTable from './components/DonateTable'
import BloodUpdate from './components/BloodTypeUpdate/BloodUpdate'

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
              <Route path='/' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/events' element={<Events />} />
              <Route path='/event' element={<Event />} />
              <Route path='/create' element={<NewEvent />} />
              <Route path='/stats' element={<Stats />} />
              <Route path='/stats/pie' element={<Pie />} />
              <Route path='/stats/chart' element={<Chart />} />
              <Route path='/test' element={<Test />} />
              <Route path='/signin' element={<SignInSide />} />
              <Route path='/donated' element={<DonateTable />} />
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
