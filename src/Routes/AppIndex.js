import React from 'react'
import { Outlet } from 'react-router-dom'
import { Col, Row } from 'reactstrap'
import Navbar from '../Menu.js/Navbar'
import Sidebar from '../Menu.js/Sidebar'

export default function AppIndex() {
    return (
        <div>
            <Row className='m-0'>
                <Navbar />
            </Row>
            <Row className='m-0'>
                <Col md={2} className='sidebarr'>
                    <Sidebar />
                </Col>
                <Col md={10}>
                    <Outlet />
                </Col>
            </Row>
        </div>
    )
}
