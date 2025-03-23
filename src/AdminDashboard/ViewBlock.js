import React, { useEffect, useState } from "react";
import { Edit, MessageCircle, Printer, Trash } from "react-feather";
// import { useNavigate } from 'react-router-dom';
import { Card, Col, Modal, ModalBody, Row } from "reactstrap";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useQuery } from "../components/helpers";
import axios from "axios";

export default function ViewBlock() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [block, setBlock] = useState({});
  const [tenantId, setTenantId] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const query = useQuery();
  const blockId = query.get(`block_id`);
  const propertyId = query.get(`property_id`);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    sex: "",
    purpose: "",
    accommodation: "",
    duration: "",
    rent: "",
    expiry: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
  const token = localStorage.getItem("access_token");

  const fetchBlock = () => {
    setLoading(true);
    if (!token) {
      console.error("No access token found");
      setLoading(false);
      return;
    }

    axios
      .get(`https://projectestate.onrender.com/api/blocks/${blockId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // params: {
        //   search: query, // Include the search query as a parameter
        // },
      })
      .then((response) => {
        setLoading(false);
        setBlock(response?.data);
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error fetching data", err);
      });
  };

  useEffect(() => {
    fetchBlock();
  }, [token]);

  const deleteTenant = () => {
    setLoading2(true);
    axios
      .delete(`https://projectestate.onrender.com/api/tenants/${tenantId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setLoading2(false);
        console.log(response);
        if (response.status === 200) {
          toggle();
          fetchBlock();
        }
        // alert("Property updated successfully!");
        // navigate("/admin/PM");
      })
      .catch((error) => {
        setLoading2(false);
        console.error("Error updating property:", error);
        // alert("Failed to update property");
      });
  };

  const editTenant = async () => {
    setLoading3(true);
    setError("");
    if (!token) {
      setError("Unauthorized! Please log in.");
      setLoading3(false);
      return;
    }

    const requestBody = {
      name: formData.name,
      phone: formData.phone,
      sex: formData.sex,
      purpose: formData.purpose,
      accommodation: formData.accommodation,
      duration: formData.duration,
      rent: Number(formData.rent),
      expiry: formData.expiry,
      property_id: propertyId, // Replace with actual value
      block_id: blockId, // Replace with actual value
    };

    try {
      const response = await axios.put(
        `https://projectestate.onrender.com/api/tenants/${tenantId}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Tenant added successfully", response.data);
      setFormData({
        name: "",
        phone: "",
        sex: "",
        purpose: "",
        accommodation: "",
        duration: "",
        rent: "",
        expiry: "",
      });
      if (response.status === 200) {
        toggle3(); // Close the form or give success feedback
        fetchBlock();
      }
    } catch (err) {
      setError(err.response?.data?.detail || "An error occurred.");
    } finally {
      setLoading3(false);
    }
  };
  return (
    <div className="outlet_">
      {/* <Card className="admin-card p-3"> */}
      <Row className="mt-3">
        <Col md={6}>
          <h3>{block.block_name}/Tenants List</h3>
        </Col>
        <Col md={6}>
          {/* <Button btnText='Edit PM' icon={<FaPen />} style={{ float: 'right' }} onClick={() => navigate('')} /> */}
        </Col>
      </Row>
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div class="auth_btn_loader" style={{ color: "grey" }}>
            <span
              style={{ width: "1rem", height: "1rem" }}
              class="spinner-border"
              role="status"
              aria-hidden="true"
            ></span>
          </div>
        </div>
      ) : (
        <div>
          {block?.tenants?.length === 0 ? (
            <div className="mt-3 text-center">
              <span>No tenants in this block</span>
            </div>
          ) : (
            <>
              {/* <div className="table-container mt-3"> */}
              <Table className="mt-3">
                <Thead>
                  <Tr>
                    {/* <Th>S/N</Th> */}
                    <Th className="p-2 border">Tenants</Th>
                    <Th className="p-2 border">Phone</Th>
                    <Th className="p-2 border">Sex</Th>
                    <Th className="p-2 border">Purpose</Th>
                    <Th className="p-2 border">Acmdn</Th>
                    <Th className="p-2 border">Duration</Th>
                    <Th className="p-2 border">Rent</Th>
                    <Th className="p-2 border">Status</Th>
                    <Th className="p-2 border">Expiry</Th>
                    <Th className="p-2 border">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {block.tenants?.map((item, index) => (
                    <Tr className="table_row" key={index}>
                      {/* <Th scope="row">{index + 1}</Th> */}
                      <Td className="p-2 border">{item.name}</Td>
                      <Td className="p-2 border">{item.phone}</Td>
                      <Td className="p-2 border">{item.sex}</Td>
                      <Td className="p-2 border">{item.purpose}</Td>
                      <Td className="p-2 border">{item.accommodation}</Td>
                      <Td className="p-2 border">{item.duration}</Td>
                      <Td className="p-2 border">{item.rent}</Td>
                      <Td className="text-success p-2 border">Paid</Td>
                      <Td className="p-2 border">{item.expiry}</Td>
                      <Td className="p-2 border">
                        <div>
                          <Edit
                            className="menu"
                            size="1.5em"
                            onClick={() => {
                              toggle3();
                              setTenantId(item?.id);
                              setFormData((prev) => ({
                                ...prev,
                                ...Object.fromEntries(
                                  Object.entries(item).filter(
                                    ([key]) => key in prev
                                  ) // Keep only matching keys
                                ),
                              }));
                            }}
                          />
                          <Trash
                            className="menu"
                            size="1.5em"
                            onClick={() => {
                              toggle();
                              setTenantId(item?.id);
                            }}
                          />
                          <MessageCircle
                            className="menu"
                            size="1.5em"
                            onClick={toggle4}
                          />
                          <Printer
                            className="menu"
                            size="1.5em"
                            onClick={toggle5}
                          />
                        </div>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </>
          )}
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
                <h6>Edit tenant</h6>
                <div>
                  <input
                    type="text"
                    className="inputs"
                    placeholder="Tenant Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    className="inputs"
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <div className="select">
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleChange}
                    >
                      <option value="">-select sex-</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="select">
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleChange}
                    >
                      <option value="">-select purpose-</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Residential">Residential</option>
                    </select>
                  </div>
                  <div className="select">
                    <select
                      name="accommodation"
                      value={formData.accommodation}
                      onChange={handleChange}
                    >
                      <option value="">-select accommodation-</option>
                      <option value="Duplex">Duplex</option>
                      <option value="Bungalo">Bungalow</option>
                      <option value="Terrace">Terrace</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Detached">Detached</option>
                    </select>
                  </div>
                  <div className="select">
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                    >
                      <option value="">-select duration-</option>
                      <option value="1year">1 year</option>
                      <option value="2years">2 years</option>
                      <option value="3years">3 years</option>
                      <option value="4years">4 years</option>
                      <option value="5years">5 years</option>
                    </select>
                  </div>
                  <input
                    type="number"
                    className="inputs"
                    placeholder="Rent"
                    name="rent"
                    value={formData.rent}
                    onChange={handleChange}
                  />
                  <input
                    type="date"
                    className="inputs"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                  />
                </div>

                {error && <p className="error-text">{error}</p>}

                <div className="mt-3">
                  <Button
                    btnText={loading3 ? "Saving..." : "Save"}
                    onClick={editTenant}
                  />
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
                <p className="m-0 mb-3" style={{ fontSize: 12 }}>
                  Are you sure you want to delete this tenant?
                </p>
                <div>
                  <Button
                    btnText={loading2 ? "Deleting..." : "Delete"}
                    onClick={deleteTenant}
                  />
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
                        <span style={{ float: "left" }}>
                          Introduction Letter
                        </span>
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
      )}
    </div>
  );
}
