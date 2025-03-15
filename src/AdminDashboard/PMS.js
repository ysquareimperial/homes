import React, { useState } from "react";
// import { Filter, Search } from 'react-feather';
import { AiOutlineMenu } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Card, Col, Modal, ModalBody, Row, Table } from "reactstrap";
import Button from "./Button";

export default function PM() {
  const [open1, setOpen1] = useState(false);
  const toggle1 = () => {
    setOpen1(!open1);
  };
  const navigate = useNavigate();

  const operatorsData = [
    {
      name: "Habu",
      address: "No 108, Yakasai, KMC, Kano",
      noOfTenants: 10,
      noOfBlocks: 10,
    },
  ];
  return (
    <div className="mt-4">
      <Card className="admin-card p-3">
        <Row>
          <Col lg={6} md={6} sm={6} xs={6}>
            <p className="card-title">Properties</p>
          </Col>
          <Col lg={6} md={6} sm={6} xs={6}>
            <Button
              btnText="Add property"
              icon={<FaPlus />}
              style={{ float: "right", fontSize: 12 }}
              onClick={() => navigate("/admin/create-pm")}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <input
              type="search"
              placeholder={"search PM..."}
              className="inputs mt-3 searchinput"
            />
          </Col>
          <Col md={6}>
            {/* <Filter/> */}
            <MdFilterList
              style={{
                float: "right",
                marginLeft: 20,
                color: "rgb(34, 64, 41)",
              }}
              className="mt-4 filter"
              size="1.5em"
              data-toggle="tooltip"
              data-placement="bottom"
              title="filter"
            />
            {/* <MdOutlineFilter2/> */}
            {/* <MdFilterList/> */}
          </Col>
        </Row>
        <Table className="mt-3" striped borderless responsive size="sm">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Address</th>
              <th>Tenants</th>
              <th>Blocks</th>
            </tr>
          </thead>
          <tbody>
            {operatorsData.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.noOfTenants}</td>
                <td>{item.noOfBlocks}</td>
                <td>
                  <AiOutlineMenu
                    className="menu"
                    size="1.5em"
                    onClick={toggle1}
                  />
                  {/* <AiOutlineMenu className='menu' size='1.5em' onClick={() => navigate('/admin/view-operator')} /> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Modal
        size="sm"
        isOpen={open1}
        toggle={toggle1}
        className="avail-cars"
        style={{ padding: 0 }}
      >
        <ModalBody className="modal-body">
          <div className="menu-div">
            {/* <p className='p-menu p-viw' onClick={() => navigate('/admin/create-tenant')}>Add Tenant</p> */}
            {/* <hr />   */}
            <p
              className="p-menu p-viw"
              onClick={() => navigate("/admin/view-pm")}
            >
              View
            </p>
            <hr style={{ width: "100%" }} />
            <p
              className="p-menu p-edt"
              onClick={() => navigate("/admin/edit-pm")}
            >
              Edit
            </p>
            <hr style={{ width: "100%" }} />
            {/* <p className='p-menu'>Edit</p> */}
            <p className="p-menu p-dlt" style={{ color: "red" }}>
              Delete
            </p>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
