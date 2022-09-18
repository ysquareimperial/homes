import React, { useState } from 'react'
import { ArrowDownCircle, Settings } from 'react-feather'
import { AiOutlineEllipsis, AiOutlineMenu, AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { FaBell, FaEllipsisH } from 'react-icons/fa'
import { MdCircleNotifications, MdNotificationAdd, MdNotificationImportant } from 'react-icons/md'
import { Navigate, useNavigate } from 'react-router-dom'
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap'
import logo from '../Images/HomesLogo.jpg'
import user from '../Images/profile.jpg'
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const navigate = useNavigate()
  return (
    <div className='navb'>
      <Row className=''>
        <Col md={1}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
            <div>
              <img src={logo} className='logo' />
            </div>
          </div>
        </Col>
        <Col md={1}></Col>
        <Col md={1}></Col>
        <Col md={1}></Col>
        <Col md={1}></Col>
        <Col md={1}></Col>
        <Col md={1}></Col>
        <Col md={1}></Col>
        {/* <Col md={1}></Col> */}
        <Col md={2}>
          {/* <p className='username'>Habu Yakasai</p> */}
        </Col>
        <Col md={2} className=''>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }} >
            <div className='relative' style={{ cursor: 'pointer' }} onClick={() => navigate('/operator/notifications')}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                  <span className='absolute'>1</span>
                </div>
              </div>
              <FaBell size='1.6em' style={{ color: 'rgb(34, 64, 41)', zIndex: 1 }} />
            </div>
            <div className='bell_user_icon_div'>
              <p className='username'>Habu Yakasai{' '}<img src={user} className='userimage' /></p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
