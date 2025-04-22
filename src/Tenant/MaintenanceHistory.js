import React, { useEffect, useState } from "react";
import Button from "../AdminDashboard/Button";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import axios from "axios";

const MaintenanceHistory = () => {
  const [showMore, setShowMore] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access_token");
  const [maintenanceHist, setMaintenanceHist] = useState([]);
  const toggleShowMore = (id) => {
    setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const fetchMaintenance = () => {
    setLoading(true);

    if (!token) {
      console.error("No access token found");
      setLoading(false);
      return;
    }

    axios
      .get("https://projectestate.onrender.com/api/maintenance/by-tenant", {
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
    <div className="outlet_">
      <Row className="mt-3 m-0">
        <Col md={6}>
          <h3>Maintenance History</h3>
        </Col>
        <Col md={6}>
          {/* <Button
            btnText="Request"
            // icon={<FaPlus />}
            style={{ float: "right", fontSize: 12 }}
            onClick={() => navigate("/tenant/request-maintenance")}
          /> */}
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
        <div className="mt-3">
          {maintenanceHist?.length === 0 ? (
            <div className="text-center">
              <span>No maintenance found</span>
            </div>
          ) : (
            <>
              {maintenanceHist.map((item) => (
                <div key={item.id} className="card p-3 mb-3">
                  <h5>{item.property_name}</h5>
                  <p>
                    <strong>Phone:</strong> {item.phone_number}
                  </p>

                  <p>
                    <strong>Details:</strong>{" "}
                    {showMore[item.id]
                      ? item.description
                      : `${item.description.substring(0, 30)}...`}
                    {item.description.length > 30 && (
                      <span
                        onClick={() => toggleShowMore(item.id)}
                        className="text-primary underline"
                      >
                        {" "}
                        {showMore[item.id] ? "Less" : "More"}
                      </span>
                    )}
                  </p>
                  <p>
                    <strong>Priority:</strong> {item.priority}
                  </p>
                  {/* <p
                    className={
                      item.status === "Treated"
                        ? "text-success"
                        : item.status === "Pending"
                        ? "text-warning"
                        : "text-danger"
                    }
                  >
                    <strong>Status:</strong> {item.status}
                  </p> */}

                  <p>Attached Images</p>
                  <Row>
                    <Col md={4}>
                      {item?.images?.map((item, index) => (
                        <div>
                          <img src={item.file_url} style={{ width: "100%" }} />
                        </div>
                      ))}
                    </Col>
                  </Row>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MaintenanceHistory;
