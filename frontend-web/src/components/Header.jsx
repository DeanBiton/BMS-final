import { FaSignInAlt, FaSignOutAlt, FaUser,FaRegChartBar,FaRegCalendarPlus,FaRegCalendarAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import Button from '@mui/material/Button';
function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>B.M.S</Link>
      </div>
      <ul>
        {user ? (
          <>
          
            <li>
              <button className='btn' onClick={()=>navigate('/events')}>
                <FaRegCalendarAlt /> Events List
              </button>
            </li>
            <li>
              <button className='btn' onClick={()=>navigate('/create')}>
                <FaRegCalendarPlus /> New Event
              </button>
            </li>
            <li>
              <button className='btn' onClick={()=>navigate('/stats')}>
                <FaRegChartBar /> Stats
              </button>
            </li>
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
            <li>
            <Button onClick={()=>navigate('/stats')} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Log Out
          </Button>
            </li>
          
          
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
