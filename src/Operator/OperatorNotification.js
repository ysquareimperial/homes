import React from 'react'
import { FaCalendar, FaMoneyBill, FaPhone, FaTrash, FaUser } from 'react-icons/fa'
import { MdMapsHomeWork } from 'react-icons/md'
import { Card, Col, Row } from 'reactstrap'

export default function OperatorNotification() {
    const notificationData = [{
        name: 'Habu Yakasai',
        expiryDate: '12/12/2012',
        pm: 'PM1',
        rent: '100,000',
        phone: '+234 09018661696',
    },
    {
        name: 'Habu Yakasai',
        expiryDate: '12/12/2012',
        pm: 'PM1',
        rent: '100,000',
        phone: '+234 09018661696',
    }
    ]
    return (
        <div className='mt-4'>
            <Card className='admin-card p-3'>
                <Row>
                    <Col md={6}>
                        <p className='card-title m-0'>Notifications</p>
                        <p className='' style={{ fontSize: 20 }}>Due Rents</p>
                    </Col>
                    <Col md={6}>
                        {/* <Button btnText='Edit PM' icon={<FaPen />} style={{ float: 'right' }} onClick={() => navigate('/admin/edit-pm')} /> */}
                    </Col>
                    <Col md={2}>
                    </Col>
                </Row>
                
                {notificationData.map((item) =>
                (
                    <div className='' style={{ fontSize: 12 }}>
                        <Card className='not_card shadow-sm p-2 m-1'>
                            <Row>
                                <Col md={2} className=''>
                                    <MdMapsHomeWork className='not_icon' size='1em' color='grey' />
                                    {' '}
                                    {item.pm}
                                    <div className='not_data'>
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className='not_data'>
                                        <FaUser className='not_icon' size='1em' color='grey' />
                                        {' '}
                                        {item.name}
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className='not_data'>
                                        <FaPhone className='not_icon' size='1em' color='grey' />
                                        {' '}
                                        {item.phone}
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className='not_data'>
                                        <FaMoneyBill className='not_icon' size='1em' color='grey' />
                                        {' '}
                                        {item.rent}
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className='not_data'>

                                        <FaCalendar className='not_icon' size='1em' color='grey' />
                                        {' '}{item.expiryDate}
                                    </div>
                                </Col>
                                <Col md={1}>
                                    <div className='not_data'>

                                        <FaTrash className='not_icon' size='1em' color='grey' style={{ float: 'right', marginTop: '' }} />
                                        {/* {' '}{item.expiryDate} */}
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                )
                )}
            </Card>
        </div>
    )
}
