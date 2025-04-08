import React, { useEffect, useState } from "react";
import Button from "../AdminDashboard/Button";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import axios from "axios";

const maintenanceHistoryData = [
  {
    id: 1,
    tenant: "Habu Yakasai",
    phone: "+234 090 3334 434",
    category: "Plumbing",
    details: "Leaking pipe in the kitchen, needs urgent fixing.",
    priority: "High",
    status: "Treated",
  },
  {
    id: 2,
    tenant: "Amina Bello",
    phone: "+234 081 5678 123",
    category: "Electrical",
    details: "Frequent power tripping in the apartment.",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 3,
    tenant: "John Doe",
    phone: "+234 080 9876 654",
    category: "Carpentry",
    details: "Broken door frame in the living room.",
    priority: "Low",
    status: "Canceled",
  },
  {
    id: 4,
    tenant: "Fatima Suleiman",
    phone: "+234 070 4567 890",
    category: "HVAC",
    details: "Air conditioner not cooling properly.",
    priority: "High",
    status: "Pending",
  },
];

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
        .get("https://projectestate.onrender.com/api/maintenance", {
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
      <div className="mt-3">
        {maintenanceHist.map((item) => (
          <div key={item.id} className="card p-3 mb-3">
            <h5>{item.property_name}</h5>
            <p>
              <strong>Phone:</strong> {item.phone_number}
            </p>
            {/* <p>
              <strong>Category:</strong> Category
            </p> */}
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
            <p
              className={
                item.status === "Treated"
                  ? "text-success"
                  : item.status === "Pending"
                  ? "text-warning"
                  : "text-danger"
              }
            >
              <strong>Status:</strong> {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceHistory;
