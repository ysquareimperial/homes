import React, { useState } from 'react'
// import { Filter, Search } from 'react-feather';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import {MdFilterList} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Modal, ModalBody, Row, Table } from 'reactstrap'
import Button from './Button'

export default function PM() {
    const [open1, setOpen1] = useState(false);
    const toggle1 = () => {
        setOpen1(!open1);
    };
    const navigate = useNavigate()

    const operatorsData = [
        {
            firstName: 'Habu',
            lastName: 'Yakasai',
            phone: '+234 901866169',
            PM: 12,
            noOfTentants: 10,
            PMAddress: 'No 108, Yakasai, KMC, Kano',
            assignedTo: 'Habu Yakasai'
        }
    ]
    return (
        <div className='mt-4'>
            <Card className='admin-card p-3'>
                <Row>
                    <Col md={6}>
                        <p className='card-title'>PM's</p>
                    </Col>
                    <Col md={6}>
                        <Button btnText='Add PM' icon={<FaPlus />} style={{ float: 'right' }} onClick={() => navigate('/admin/create-pm')} />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <input type='search' placeholder={'search PM...'} className='inputs mt-3 searchinput' />
                    </Col>
                    <Col md={6}>
                        {/* <Filter/> */}
                        <MdFilterList style={{ float: 'right', marginLeft: 20, color: 'rgb(34, 64, 41)' }} className='mt-4 filter' size="1.5em" data-toggle="tooltip"
                            data-placement="bottom"
                            title="filter" />
                        {/* <MdOutlineFilter2/> */}
                        {/* <MdFilterList/> */}
                    </Col>
                </Row>
                <Table className='mt-3' striped borderless size='sm'>
                    <thead>
                        <tr>
                            <th>
                                S/N
                            </th>
                            <th>
                                PM
                            </th>
                            <th>
                                No of Tentants
                            </th>
                            <th>
                                PM Address
                            </th>
                            <th>
                                First Name
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                Phone
                            </th>
                            <th>
                                Assigned To
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {operatorsData.map((item, index) => (
                            <tr>
                                <th scope="row">
                                    {index + 1}
                                </th>
                                <td>
                                    {item.PM}
                                </td>
                                <td>
                                    {item.noOfTentants}
                                </td>
                                <td>
                                    {item.PMAddress}
                                </td>
                                <td>
                                    {item.firstName}
                                </td>
                                <td>
                                    {item.lastName}
                                </td>
                                <td>
                                    {item.phone}
                                </td>
                                <td>
                                    {item.assignedTo}
                                </td>
                                <td>
                                    <AiOutlineMenu className='menu' size='1.5em' onClick={toggle1} />
                                    {/* <AiOutlineMenu className='menu' size='1.5em' onClick={() => navigate('/admin/view-operator')} /> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
            <Modal size="sm" isOpen={open1} toggle={toggle1} className="avail-cars" style={{ padding: 0 }}>
                <ModalBody className="modal-body">
                    <div className='menu-div'>
                        {/* <p className='p-menu p-viw' onClick={() => navigate('/admin/create-tenant')}>Add Tentant</p> */}
                        {/* <hr />   */}
                        <p className='p-menu p-viw' onClick={() => navigate('/admin/view-pm')}>View</p>
                        <hr style={{ width: '100%' }} />
                        <p className='p-menu p-edt' onClick={() => navigate('/admin/edit-pm')}>Edit</p>
                        <hr style={{ width: '100%' }} />
                        {/* <p className='p-menu'>Edit</p> */}
                        <p className='p-menu p-dlt' style={{ color: 'red' }}>Delete</p>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}
