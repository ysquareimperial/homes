import React from 'react'
import { ImHome, ImUser } from 'react-icons/im'
import { MdMapsHomeWork } from 'react-icons/md'
import { MdDashboard } from 'react-icons/md'
import { FaUserPlus, FaUsers } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
export default function Sidebar() {
    const navigate = useNavigate()
    return (
        <div className='mt-4'>
            <p className='list' onClick={() => navigate('/admin')}><MdDashboard size='1.5em' />{' '}Dashboard</p>
            <p className='list' onClick={() => navigate('/admin/operators')}><FaUsers size='1.5em' />{' '}Operators</p>
            <p className='list' onClick={() => navigate('/admin/create-PM')}><MdMapsHomeWork size='1.5em' />{' '}Landloard/lady</p>
        </div>
    )
}
