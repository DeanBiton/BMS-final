import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import {FaRegCalendarAlt, FaRegCalendarPlus, FaRegChartBar, FaSignOutAlt,FaUserEdit} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import logo from '../assets/logo.jpeg'

export default function SideMenu(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
      }
    return (
        <ProSidebar>
         
        <SidebarHeader>
            <img  id='logoSideBar' src={logo}/>
        </SidebarHeader>

        <Menu iconShape="circle">
            <MenuItem icon={<FaRegCalendarAlt />}>
            Events
            <Link to="/events" />
            </MenuItem>
            <MenuItem icon={<FaRegCalendarPlus />}>
            New Event
            <Link to="/create" />
            </MenuItem >
            <SubMenu title="Statistics" icon={<FaRegChartBar />}>
            <MenuItem>
            Blood type ratio
            <Link to="/stats/pieBloodType" />
            </MenuItem>
            <MenuItem>
            Events by city
            <Link to="/stats/chartCity" />
            </MenuItem>
            <MenuItem>
            Blood type per month
            <Link to="/stats/chartBloodType" />
            </MenuItem>
            </SubMenu>
            <MenuItem icon={<FaUserEdit />}>
            Update blood type
            <Link to="/bloodTypeUpdate" />
            </MenuItem >
        </Menu>
        <SidebarFooter className='SidebarFooter' style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '10px 10px'
          }}
        >
          <button
            className="sidebar-btn"
            onClick={onLogout}           
          >
            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
             Log Out
            </span>
          </button>
        </div>
        </SidebarFooter>

        </ProSidebar>
    )
}