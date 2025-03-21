import React, { useState } from "react";
import { Edit, MessageCircle, Printer, Trash } from "react-feather";
// import { useNavigate } from 'react-router-dom';
import { Card, Col, Modal, ModalBody, Row } from "reactstrap";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";

export default function ViewBlock() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };
  const [open3, setOpen3] = useState(false);
  const toggle3 = () => {
    setOpen3(!open3);
  };
  const [open4, setOpen4] = useState(false);
  const toggle4 = () => {
    setOpen4(!open4);
  };
  const [open5, setOpen5] = useState(false);
  const toggle5 = () => {
    setOpen5(!open5);
  };
  // const [open6, setOpen6] = useState(false);
  // const toggle6 = () => {
  //     setOpen6(!open6);
  // };
  // const navigate = useNavigate()

  const operatorsData = [
    {
      tenant: "Habu Yakasai",
      phone: "+234 090 3334 434",
      sex: "Male",
      purpose: "Commercial",
      accormmodation: "Shop",
      duration: "1year",
      rent: "₦ 100,000",
      status: "Paid",
      expiry: "12/01/2020",
    },
    {
      tenant: "Habu Yakasai",
      phone: "+234 090 3334 434",
      sex: "Male",
      purpose: "Commercial",
      accormmodation: "Shop",
      duration: "1year",
      rent: "₦ 100,000",
      status: "Paid",
      expiry: "12/01/2020",
    },
    {
      tenant: "Habu Yakasai",
      phone: "+234 090 3334 434",
      sex: "Male",
      purpose: "Commercial",
      accormmodation: "Shop",
      duration: "1year",
      rent: "₦ 100,000",
      status: "Paid",
      expiry: "12/01/2020",
    },
  ];
  return (
    <div className="mt-4">
      {/* <Card className="admin-card p-3"> */}
      <Row>
        <Col md={6}>
          <p className="card-title">Property name/Block A/Tenants List</p>
        </Col>
        <Col md={6}>
          {/* <Button btnText='Edit PM' icon={<FaPen />} style={{ float: 'right' }} onClick={() => navigate('')} /> */}
        </Col>
      </Row>

      {/* <div className="table-container mt-3"> */}
      <Table className="mt-3">
        <Thead>
          <Tr>
            {/* <Th>S/N</Th> */}
            <Th>Tenants</Th>
            <Th>Phone</Th>
            <Th>Sex</Th>
            <Th>Purpose</Th>
            <Th>Acmdn</Th>
            <Th>Duration</Th>
            <Th>Rent</Th>
            <Th>Status</Th>
            <Th>Expiry</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {operatorsData.map((item, index) => (
            <Tr>
              {/* <Th scope="row">{index + 1}</Th> */}
              <Td>{item.tenant}</Td>
              <Td>{item.phone}</Td>
              <Td>{item.sex}</Td>
              <Td>{item.purpose}</Td>
              <Td>{item.accormmodation}</Td>
              <Td>{item.duration}</Td>
              <Td>{item.rent}</Td>
              <Td className="text-success">{item.status}</Td>
              <Td>{item.expiry}</Td>
              <Td>
                <div>
                  <Edit className="menu" size="1.5em" onClick={toggle3} />
                  <Trash className="menu" size="1.5em" onClick={toggle} />
                  <MessageCircle
                    className="menu"
                    size="1.5em"
                    onClick={toggle4}
                  />
                  <Printer className="menu" size="1.5em" onClick={toggle5} />
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* </div> */}
      {/* </Card> */}

      <Modal
        size=""
        isOpen={open3}
        toggle={toggle3}
        className="avail-cars"
        style={{ padding: 0 }}
      >
        <ModalBody className="modal-body">
          <div className="menu-div">
            <h6>Edit Tenant</h6>
            <div>
              <input type="text" className="inputs" placeholder="Title" />
              <input
                type="text"
                className="inputs"
                placeholder="Tenant Full Name"
              />
              <input type="text" className="inputs" placeholder="Phone" />
              <div className="select">
                <select>
                  <option>-select sex-</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="select">
                <select>
                  <option>-select purpose-</option>
                  <option>Commercial</option>
                  <option>Residential</option>
                </select>
              </div>
              <div className="select">
                <select>
                  <option>-select accommodation-</option>
                  <option>Duplex</option>
                  <option>Bungalo</option>
                  <option>Terrace</option>
                  <option>Apartment</option>
                  <option>Detached</option>
                </select>
              </div>
              <div className="select">
                <select>
                  <option>-select bedroom-</option>
                  <option>1 Bedroom</option>
                  <option>2 Bedrooms</option>
                  <option>3 Bedrroms</option>
                  <option>4 Bedrooms</option>
                  <option>5 Bedrooms</option>
                  <option>6 Bedrooms</option>
                  <option>7 Bedrooms</option>
                </select>
              </div>
              <div className="select">
                <select>
                  <option>-select duration-</option>
                  <option>1year</option>
                  <option>2years</option>
                  <option>3years</option>
                  <option>4years</option>
                  <option>5years</option>
                </select>
              </div>
              <input type="number" className="inputs" placeholder="Rent" />
              <input type="date" className="inputs" placeholder="" />
            </div>
            <div className="mt-3">
              <Button btnText={"Save"} onClick={toggle3} />
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal
        size="sm"
        isOpen={open}
        toggle={toggle}
        className="avail-cars"
        style={{ padding: 0 }}
      >
        <ModalBody className="modal-body">
          <div className="menu-div">
            <h6>Delete Tenant</h6>
            <p className="m-0">Are you sure you want to delete this tenant?</p>
            <div>
              <Button btnText={"Delete"} onClick={toggle} />
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal
        size="sm"
        isOpen={open4}
        toggle={toggle4}
        className="avail-cars"
        style={{ padding: 0 }}
      >
        <ModalBody className="modal-body">
          <div className="menu-div">
            <h6>Add Remark</h6>
            <textarea></textarea>
            <div>
              <Button btnText={"Save"} onClick={toggle4} />
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal
        size="sm"
        isOpen={open5}
        toggle={toggle5}
        className="avail-cars"
        style={{ padding: 0 }}
      >
        <ModalBody className="modal-body">
          <div className="menu-div">
            <h6>Print</h6>
            <Table className="mt-4" striped borderless size="sm">
              <thead>
                <tr>
                  <th></th>
                  <th>
                    <div style={{ float: "right" }}></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr onClick={() => navigate("/admin/introduction-letter")}>
                  <td>
                    <span style={{ float: "left" }}>Introduction Letter</span>
                  </td>
                  <td>
                    <div style={{ float: "right" }}>
                      <Printer className="menu" size="1.5em" onClick={""} />
                    </div>
                  </td>
                </tr>
                <tr onClick={() => navigate("/admin/rent-reminder")}>
                  <td>
                    <span style={{ float: "left" }}>Rent Reminder</span>
                  </td>
                  <td>
                    <div style={{ float: "right" }}>
                      <Printer className="menu" size="1.5em" onClick={""} />
                    </div>
                  </td>
                </tr>
                <tr onClick={() => navigate("/admin/increment-letter")}>
                  <td>
                    <span style={{ float: "left" }}>Rent Incement</span>
                  </td>
                  <td>
                    <div style={{ float: "right" }}>
                      <Printer className="menu" size="1.5em" onClick={""} />
                    </div>
                  </td>
                </tr>
                <tr onClick={() => navigate("/admin/termination-letter")}>
                  <td>
                    <span style={{ float: "left" }}>
                      Termination of Tenancy
                    </span>
                  </td>
                  <td>
                    <div style={{ float: "right" }}>
                      <Printer className="menu" size="1.5em" onClick={""} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
