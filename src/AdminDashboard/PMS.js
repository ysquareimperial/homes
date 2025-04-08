import React, { useEffect, useState } from "react";
// import { Filter, Search } from 'react-feather';
import { AiOutlineMenu } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Card, Col, Modal, ModalBody, Row } from "reactstrap";
import Button from "./Button";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import PropertyTable from "../components/PropertyTable";
import { GoTrash } from "react-icons/go";

export default function PM() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [properties, setProperties] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const toggle1 = () => {
    setOpen1(!open1);
  };
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");
  const fetchProperties = () => {
    setLoading(true);
    if (!token) {
      console.error("No access token found");
      setLoading(false);
      return;
    }

    axios
      .get(`https://projectestate.onrender.com/api/properties/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setProperties(response?.data);
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error fetching data", err);
      });
  };

  useEffect(() => {
    fetchProperties();
  }, [token]);

  const handleDelete = (propertyId) => {
    setLoading2(true);
    axios
      .delete(
        `https://projectestate.onrender.com/api/properties/${propertyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setLoading2(false);
        console.log(response);
        if (response.status === 200) {
          fetchProperties();
          toggle1();
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
  return (
    <div className="outlet_">
      {/* <Card className="admin-card p-3"> */}
      <Row className="m-0 mt-4">
        <Col lg={6} md={6} sm={6} xs={6}>
          <h3 className="">Properties</h3>
        </Col>
        <Col lg={6} md={6} sm={6} xs={6}>
          <Button
            btnText="Add property"
            // icon={<FaPlus />}
            style={{ float: "right", fontSize: 12 }}
            onClick={() => navigate("/admin/create-pm")}
          />
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
          <Row className="m-0 mb-3">
            <Col md={6}>
              <input
                type="search"
                placeholder={"search PM..."}
                className="inputs mt-3 searchinput"
              />
            </Col>
            <Col md={6}>
              {/* <Filter/> */}
              {/* <MdFilterList
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
              /> */}
              {/* <MdOutlineFilter2/> */}
              {/* <MdFilterList/> */}
            </Col>
          </Row>

          {/* <PropertyTable properties={properties} toggle1={toggle1} /> */}
          {properties?.length === 0 ? (
            <div className="text-center">
              <span>No properties found</span>
            </div>
          ) : (
            <div className="">
              <Table className="">
                <Thead>
                  <Tr>
                    {/* <th>S/N</th> */}
                    <Th className="p-2 border">Name</Th>
                    <Th className="p-2 border">Address</Th>
                    <Th className="p-2 border">Tenants</Th>
                    <Th className="p-2 border">Blocks</Th>
                    <Th className="p-2 border">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {properties.map((property, index) => (
                    <Tr
                      key={index}
                      className="border-b table_row"
                      onClick={() =>
                        navigate(`/admin/view-pm?id=${property.id}`)
                      }
                    >
                      <Td className="p-2 border">{property.name}</Td>
                      <Td className="p-2 border">{property.address}</Td>
                      <Td className="p-2 border">{property.tenant_count}</Td>
                      <Td className="p-2 border">{property.block_count}</Td>
                      <Td className="p-2 border">
                        <GoTrash
                          className="text-danger"
                          size="1em"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents the Tr click from triggering
                            setPropertyId(property.id);
                            toggle1();
                          }}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          )}
        </div>
      )}

      {/* </Card> */}
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
            {/* <p
              className="p-menu p-viw"
              onClick={() => navigate(`/admin/view-pm?id=${propertyId}`)}
            >
              View
            </p>
            <hr style={{ width: "100%" }} /> */}
            {/* <p
              className="p-menu p-edt"
              onClick={() => navigate(`/admin/edit-pm?na`)}
            >
              Edit
            </p> */}
            {/* <hr style={{ width: "100%" }} /> */}
            {/* <p className='p-menu'>Edit</p> */}
            <p style={{ fontSize: 12 }}>
              Are you sure you want to delete this property?
            </p>
            <p
              className="p-menu p-dlt"
              style={{ color: "red" }}
              onClick={() => handleDelete(propertyId)}
            >
              {loading2 ? "Deleting..." : "Delete"}
            </p>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
