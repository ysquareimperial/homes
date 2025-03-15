import React from 'react'
import { Col, Row } from 'reactstrap'
import '../Styles/Styles.css'
export default function TenantsByAccommodation() {
    return (
        <div>
            <p className='d_text'>Tenants by gender</p>
            <hr></hr>
            <Row>
                <Col md={12}>
                    <p className='tnt_cnt'>Duplex<span style={{float:'right', fontWeight:'bold'}}>11</span></p>
                    <p className='tnt_cnt'>Bungalo<span style={{float:'right', fontWeight:'bold'}}>11</span></p>
                    <p className='tnt_cnt'>Terrace<span style={{float:'right', fontWeight:'bold'}}>11</span></p>
                    <p className='tnt_cnt'>Apartment<span style={{float:'right', fontWeight:'bold'}}>11</span></p>
                    <p className='tnt_cnt'>Detached<span style={{float:'right', fontWeight:'bold'}}>11</span></p>
                </Col>
            </Row>
        </div>
    )
}
