import React, { useEffect, useState } from "react";
import { Eye, PlusSquare } from "react-feather";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Card, Col, Modal, ModalBody, Row, Table } from "reactstrap";
import Button from "./Button";
import { useQuery } from "../components/helpers";
import axios from "axios";
import { CiEdit } from "react-icons/ci";

export default function ViewPM() {
  const getInitials = (name) => {
    const words = name.trim().split(" ");
    return words.length > 1
      ? `${words[0][0]}${words[1][0]}` // First character of the first two words
      : words[0][0]; // First character if there's only one word
  };
  const query = useQuery();
  const propertyId = query.get(`id`);
  const [open1, setOpen1] = useState(false);
  const toggle1 = () => {
    setOpen1(!open1);
  };
  const [open2, setOpen2] = useState(false);
  const toggle2 = () => {
    setOpen2(!open2);
  };
  const [open3, setOpen3] = useState(false);
  const toggle3 = () => {
    setOpen3(!open3);
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState([]);

  const token = localStorage.getItem("access_token");
  const fetchProperty = () => {
    setLoading(true);
    if (!token) {
      console.error("No access token found");
      setLoading(false);
      return;
    }

    axios
      .get(`https://projectestate.onrender.com/api/properties/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // params: {
        //   search: query, // Include the search query as a parameter
        // },
      })
      .then((response) => {
        setLoading(false);
        setProperty(response?.data);
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error fetching data", err);
      });
  };

  useEffect(() => {
    fetchProperty();
  }, [token]);

  const operatorsData = [
    {
      blockCode: "Block A",
      noOfTenants: 10,
    },
    {
      blockCode: "Block B",
      noOfTenants: 10,
    },
    {
      blockCode: "Block C",
      noOfTenants: 10,
    },
  ];
  return (
    <div className="outlet_">
      {/* <Card className="admin-card p-3"> */}
      <Row className="mt-3">
        <Col lg={6} md={6} sm={6} xs={6}>
          <h3>Property details</h3>
        </Col>
        <Col lg={6} md={6} sm={6} xs={6}>
          <CiEdit
            size="1.5em"
            style={{ float: "right" }}
            onClick={() => navigate("/admin/edit-pm")}
          />
        </Col>
      </Row>

      <div className="">
        <div className="d-flex align-items-center gap-3">
          <div>
            <div className="pm">
              <p className="pmsize m-0">
                {property?.name && getInitials(property.name).toUpperCase()}
              </p>
            </div>
          </div>
          <div>
            <p className="pm-data">
              <span className="sp">Name:</span> {property?.name}
            </p>
            <p className="pm-data">
              <span className="sp">Address:</span> {property?.address}
            </p>
            <p className="pm-data">
              <span className="sp">No of Tenants:</span>{" "}
              {property?.tenant_count}
            </p>

            {/* <Button btnText='Add Block' icon={<FaPen />} onClick={() => navigate('')} /> */}
            <div className="mt-3">
              <button className="block-btn mt-2" onClick={toggle1}>
                Add block
              </button>
            </div>
          </div>
        </div>

        <Table className="mt-3" striped responsive borderless size="sm">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Blocks</th>
              <th>Tenants</th>
              <th>
                <div style={{ float: "right", marginRight: "" }}>Action</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {operatorsData.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.blockCode}</td>
                <td>{item.noOfTenants}</td>
                <td>
                  <div style={{ float: "right" }}>
                    <PlusSquare
                      className="menu"
                      size="1.5em"
                      onClick={toggle2}
                    />
                    <Eye
                      className="menu"
                      size="1.5em"
                      onClick={() => {
                        navigate("/admin/view-block");
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* </Card> */}
      </div>

      <Modal
        size="sm"
        isOpen={open1}
        toggle={toggle1}
        className="avail-cars"
        style={{ padding: 0 }}
      >
        <ModalBody className="modal-body">
          <div className="menu-div">
            <h6>Add Block</h6>
            <div>
              <input type="text" className="inputs" placeholder="Block Name" />
            </div>
            <div className="mt-3">
              <Button btnText={"Save"} onClick={toggle1} />
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        size=""
        isOpen={open2}
        toggle={toggle2}
        className="avail-cars"
        style={{ padding: 0 }}
      >
        <ModalBody className="modal-body">
          <div className="menu-div">
            <h6>Add Tenant</h6>
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
              <Button btnText={"Save"} onClick={toggle2} />
            </div>
          </div>
        </ModalBody>
      </Modal>
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
              <Button btnText={"Save"} onClick={toggle2} />
            </div>
          </div>
        </ModalBody>
      </Modal>
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
              <Button btnText={"Save"} onClick={toggle2} />
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
