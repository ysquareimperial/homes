import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Col, Modal, ModalBody, Row } from "reactstrap";
import Button from "./Button";
import moment from "moment";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Maintenance = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [maintenanceImages, setMaintenanceImages] = useState([]);
  const role = localStorage.getItem("role");
  const [maintenanceHist, setMaintenanceHist] = useState([]);
  const [loading, setLoading] = useState(false);
  const toggleShowMore = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const [open5, setOpen5] = useState(false);
  const toggle5 = () => {
    setOpen5(!open5);
  };

  const fetchMaintenance = () => {
    setLoading(true);

    if (!token) {
      console.error("No access token found");
      setLoading(false);
      return;
    }

    axios
      .get("https://projectestate.onrender.com/api/maintenance/by-landlord", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setMaintenanceHist(response?.data);
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error fetching data", err);
      });
  };

  useEffect(() => {
    fetchMaintenance();
  }, [token]);

  return (
    <div className="outlet_ ">
      {/* <Card className="admin-card p-3"> */}
      <Row className="mt-3 m-0">
        <Col md={6}>
          <h3>Maintenance requests</h3>
        </Col>
        <Col md={6}></Col>
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
        <>
          {maintenanceHist?.length === 0 ? (
            <div className="text-center">
              <span>No maintenance found</span>
            </div>
          ) : (
            <Table className="mt-3">
              <Thead>
                <Tr className="">
                  <Th className="p-2 border">Property</Th>
                  <Th className="p-2 border">Tenant</Th>
                  <Th className="p-2 border">Phone</Th>
                  <Th className="p-2 border">Date</Th>
                  {/* <Th className="p-2 border">Category</Th> */}
                  <Th className="p-2 border">Details</Th>
                  <Th className="p-2 border">Priority</Th>
                  <Th className="p-2 border">Attached Images</Th>
                </Tr>
              </Thead>
              <Tbody>
                {maintenanceHist.map((item, index) => (
                  <Tr key={index} className="border-b table_row">
                    <Td className="p-2 border">{item.property_name}</Td>
                    <Td className="p-2 border">{item.tenant_name}</Td>
                    <Td className="p-2 border">{item.phone_number}</Td>
                    <Td className="p-2 border">
                      {moment(item?.created_at).format("MMMM D, YYYY h:mm A")}
                    </Td>

                    {/* <Td className="p-2 border">{item.category}</Td> */}
                    <Td className="p-2 border">
                      {expandedRows[index] || item.description?.length <= 50
                        ? item.description
                        : `${item.description.substring(0, 50)}... `}
                      {item.description?.length > 50 && (
                        <span
                          onClick={() => toggleShowMore(index)}
                          className="text-primary underline"
                        >
                          {" "}
                          {expandedRows[index] ? "Less" : "More"}
                        </span>
                      )}
                    </Td>
                    <Td className="p-2 border">{item.priority}</Td>
                    <Td
                      className="p-2 border"
                      onClick={() => {
                        setMaintenanceImages(item?.images);
                        toggle5();
                      }}
                    >
                      View
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </>
      )}

      <Modal
        size="sm"
        isOpen={open5}
        toggle={toggle5}
        className="avail-cars"
        style={{ padding: 0 }}
      >
        <ModalBody className="modal-body">
          <div className="">
            <p>Attached Images</p>
            {/* {JSON.stringify(maintenanceImages)} */}
            {maintenanceImages.map((item, index) => (
              <div style={{ width: "100%", overflow: "hidden" }}>
                <img
                  key={index}
                  src={item.file_url}
                  alt={`tenant agreement ${index}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Maintenance;
