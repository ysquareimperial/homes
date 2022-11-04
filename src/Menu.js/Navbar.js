import React from 'react'
import { FaBell } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import logo from '../Images/HomesLogo.jpg'
import user from '../Images/profile.jpg'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()


  return (
    <div className=''>
      <div>

        <Row className='navb'>
          <Col md={1}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
              <div>
                <img src={logo} className='logo' alt='homes logo' onClick={() => navigate('/admin/home')} />
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
      <div>

        <Row className='mobile_navbar'>
          <Col sm={6} xs={6}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
              <div>
                <img src={logo} className='logo' alt='homes logo' onClick={() => { location.pathname.includes('admin') ? navigate('admin/home') : navigate('operator/home') }} />
              </div>
            </div>
          </Col>

          <Col sm={6} xs={6} className=''>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', float: 'right' }} >
              <div className='relative' style={{ cursor: 'pointer' }} onClick={() => navigate('/operator/notifications')}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div>
                    <span className='absolute'>1</span>
                  </div>
                </div>
                <FaBell size='1.6em' style={{ color: 'rgb(34, 64, 41)', zIndex: 1 }} />
              </div>
              <div className='bell_user_icon_div' onClick={() => { location.pathname.includes('operator') ? navigate('/operator/profile') : navigate('admin/profile') }}>
                <p className='username no'>Habu Yakasai{' '}<img src={user} className='userimage' alt='' /></p>
                <p className='username'><img src={user} className='userimage' alt='' /></p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
