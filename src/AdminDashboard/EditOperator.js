import React from 'react'
import { FaSave } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Card, Col, Row } from 'reactstrap'
import Button from './Button'

export default function EditOperator() {
  const navigate = useNavigate()

    return (
        <div className='mt-4'>
            <Card className='admin-card p-3'>
                <p className='card-title'>Edit Operator</p>
                <Row>
                    <Col md={6}>
                        <div>
                            <input type='text' className='inputs' placeholder='First Name' />
                        </div>
                        <div>
                            <input type='text' className='inputs' placeholder='Email' />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div>
                            <input type='text' className='inputs' placeholder='Last Name' />
                        </div>
                        <div>
                            <input type='text' className='inputs' placeholder='Phone' />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div>
                            <input type='text' className='inputs' placeholder='Portfolio Name' />
                        </div>
                    </Col>
                </Row>
                <Button btnText={'Save'} icon={<FaSave/>} onClick={() => navigate('/admin/operators')}/>
            </Card>
        </div>
    )
}
