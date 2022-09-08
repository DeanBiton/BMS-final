import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, useNavigate } from 'react-router-dom';
import {FaRegCalendarAlt, FaRegCalendarPlus, FaRegChartBar, FaSignOutAlt,FaUserEdit} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

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
            <h1>B.M.S</h1>
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
            Pie
            <Link to="/stats/pie" />
            </MenuItem>
            <MenuItem>
            Chart
            <Link to="/stats/chart" />
            </MenuItem>
            </SubMenu>
            <MenuItem icon={<FaUserEdit />}>
            Update blood type
            <Link to="/bloodTypeUpdate" />
            </MenuItem >
        </Menu>
        <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
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