import React from 'react'
import { Col, Row, Card } from 'reactstrap'
import './Login.css'
import '../Styles/Styles.css'
import cover from '../Images/estate.jpg'
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const navigate = useNavigate()
    return (
        <div className='whole'>
            <Row className='m-0 divided-row'>
                <Col md={6} className='left-login-div'></Col>
                <Col md={6} className='right-login-div'></Col>
            </Row>
            <Row className='m-0 login-row'>
                <Col md={1} className=''></Col>
                <Col md={10} className='' style={{ height: '0vh' }}>
                    <div className='flexx'>
                        <div>
                            <Card className='shadow login-card' style={{ height: '75vh' }}>
                                <Row>
                                    {/* <Col md={6} className='img-col' style={{
                                        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),url(${cover})`,
                                    }}
                                    ></Col> */}
                                    <Col md={6}>
                                        <img src={cover} className="img-col" alt='' />
                                    </Col>
                                    <Col md={6} className='pt-5'>
                                        <p className='w'>Welcome</p>
                                        <div>
                                            <input className='input_field' autoComplete='off' placeholder='Email or Phone' type='text' />
                                        </div>
                                        <div>
                                            <input className='input_field' autoComplete='off' placeholder='Password' type='password' />
                                        </div>
                                        <p className='forgot'>Forgot password?</p>
                                        <div>
                                            <button className='login-btn' onClick={() => navigate('/admin/home')}>Login</button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}></Col>
                                    <Col md={6}>
                                        <Row style={{ marginTop: 80 }}>
                                            <Col md={6}>
                                                <p className='footer-text'>Privacy . Policy . Terms and Conditions</p>
                                            </Col>
                                            <Col md={6}>
                                                <p className='footer-text' style={{ float: 'right', marginRight: 15 }}>Homes &copy; 2022    </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </div>
                </Col>
                <Col md={1} className=''></Col>
            </Row>
        </div>
    )
}
