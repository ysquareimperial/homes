import React from 'react'
// import { ImHome, ImUser } from 'react-icons/im'
import { MdMapsHomeWork } from 'react-icons/md'
import { MdDashboard } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
export default function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <>
            {location.pathname.includes('operator/') ? null :
                <div className='mt-4'>
                    {/* <p className={`sidebar-i ${location.pathname === "/pending-tasks" && "active_sidebar" }`} onClick={() => navigate('/pending-tasks')}><i class="fa-solid fa-list-check"></i>{' '}My Tasks</p> */}
                    <p className={`list ${location.pathname === "/admin/home" && "active_listss"}`} onClick={() => navigate('/admin/home')}><MdDashboard size='1.5em' />{' '}Dashboard</p>
                    <p className={`list ${location.pathname === "/admin/operators" && "active_listss"}`} onClick={() => navigate('/admin/operators')}><FaUsers size='1.5em' />{' '}Operators</p>
                    <p className={`list ${location.pathname === "/admin/PM" && "active_listss"}`} onClick={() => navigate('/admin/PM')}><MdMapsHomeWork size='1.5em' />{' '}PM</p>
                </div >
            }
            {location.pathname.includes('admin') ? null :
                <div className='mt-4'>
                    {/* <p className={`sidebar-i ${location.pathname === "/pending-tasks" && "active_sidebar" }`} onClick={() => navigate('/pending-tasks')}><i class="fa-solid fa-list-check"></i>{' '}My Tasks</p> */}
                    <p className={`list ${location.pathname === "/operator/home" && "active_listss"}`} onClick={() => navigate('/operator/home')}><MdDashboard size='1.5em' />{' '}Dashboard</p>
                    <p className={`list ${location.pathname === "/operator/PM" && "active_listss"}`} onClick={() => navigate('/operator/PM')}><MdMapsHomeWork size='1.5em' />{' '}PM</p>
                </div >
            }
        </>
    )
}
