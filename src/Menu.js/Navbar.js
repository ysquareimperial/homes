import React from 'react'
import { FaBell } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import logo from '../Images/HomesLogo.jpg'
import user from '../Images/profile.jpg'
import { useLocation } from 'react-router-dom'
export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <div className='navb'>
      <Row className=''>
        <Col md={1}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
            <div>
              <img src={logo} className='logo' alt='homes logo' />
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
            <div className='bell_user_icon_div' onClick={() => { location.pathname.includes('operator') ? navigate('/operator/profile') : navigate('admin/profile') }}>
              <p className='username'>Habu Yakasai{' '}<img src={user} className='userimage' alt='' /></p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}
