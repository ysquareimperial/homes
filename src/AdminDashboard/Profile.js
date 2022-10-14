import React from 'react'
import { Card, Col, Modal, ModalBody, Row } from 'reactstrap'
import Button from '../AdminDashboard/Button'
import profile from '../Images/profile.jpg'
import { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
export default function Profile() {
    const [open, setOpen] = useState(false)
    const openModal = () => {
        setOpen(!open)
    }
    const navigate = useNavigate()
    return (
        <div className='mt-4'>

            <Card className='admin-card p-3'>
                <Row>
                    <Col md={6}>
                        <p className='card-title mb-3'>Admin Profile</p>
                    </Col>
                    <Col md={6}>
                        {/* <Button btnText='Add PM' icon={<FaPlus />} style={{ float: 'right' }} onClick={() => navigate('/admin/create-pm')} /> */}
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div className='profile-div' >
                            <img src={profile} alt='profilepicture' className='profile-image shadow' />
                        </div>
                        <div className='profile-data-div p-4' style={{ height: '60vh' }}>
                            <Row className='pt-5'>
                                <p style={{ fontWeight: 'bold', fontSize: '30px', margin: 0 }}>
                                    Habu Yakasai
                                </p>
                                <p style={{ margin: 0 }}>
                                    habuyakasai@gmail.com
                                </p>
                                <p style={{ margin: 0 }}>
                                    07032906691
                                </p>
                            </Row>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='profile-data p-4' style={{ height: '60vh' }}>
                            <Row className=''>
                                <p style={{ fontWeight: 'bold', fontSize: '20px', margin: 0 }}>
                                    Create Operator
                                </p>
                                <div>
                                    <input type='text' className='inputs' placeholder='First Name' />
                                </div>
                                <div>
                                    <input type='text' className='inputs' placeholder='Last Name' />
                                </div>
                                <div>
                                    <input type='email' className='inputs' placeholder='Email' />
                                </div>
                                <div>
                                    <input type='number' className='inputs' placeholder='Phone' />
                                </div>
                                <div>
                                    <input type='text' className='inputs' placeholder='Portfolio' />
                                </div>
                                <Button btnText={'Save'} onClick={openModal} />
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Card>
            <Modal size='sm' isOpen={open} className=''>
                <div className='p-4 text-center'>
                    <p>Successfully created an operator</p>
                    <Row>
                        <Col md={6}>
                            <Button btnText={'View'} onClick={() => navigate('/admin/operators')} />
                        </Col>
                        <Col md={6}>
                            <Button btnText={'Close'} onClick={openModal} />
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>
    )
}
