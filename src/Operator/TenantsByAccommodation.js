import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import "../Styles/Styles.css";
import axios from "axios";
export default function TenantsByAccommodation() {
  const token = localStorage.getItem("access_token");
  const [tenantsByAccommodation, setTenantsByAccommodation] = useState({});

  const fetchTenantsByGender = () => {
    if (!token) {
      console.error("No access token found");
      return;
    }

    axios
      .get(
        "https://projectestate.onrender.com/api/dashboard/tenants-by-accommodation",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setTenantsByAccommodation(response?.data);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
      });
  };

  useEffect(() => {
    fetchTenantsByGender();
  }, [token]);
  return (
    <div style={{fontSize:12}}>
      <p className="d_text">Tenants by Accommodation</p>
      <hr></hr>
      <Row>
        <Col md={12}>
          {/* {JSON.stringify(tenantsByAccommodation)} */}
          <p className="tnt_cnt">
            Duplex
            <span style={{ float: "right", fontWeight: "bold" }}>
              {tenantsByAccommodation?.Duplex ?? 0}
            </span>
          </p>
          <p className="tnt_cnt">
            Bungalo
            <span style={{ float: "right", fontWeight: "bold" }}>
              {" "}
              {tenantsByAccommodation?.Bungalo ?? 0}
            </span>
          </p>
          <p className="tnt_cnt">
            Terrace
            <span style={{ float: "right", fontWeight: "bold" }}>
              {" "}
              {tenantsByAccommodation?.Terrace ?? 0}
            </span>
          </p>
          <p className="tnt_cnt">
            Apartment
            <span style={{ float: "right", fontWeight: "bold" }}>
              {" "}
              {tenantsByAccommodation?.Apartment ?? 0}
            </span>
          </p>
          <p className="tnt_cnt">
            Detached
            <span style={{ float: "right", fontWeight: "bold" }}>
              {" "}
              {tenantsByAccommodation?.Detached ?? 0}
            </span>
          </p>
          <p className="tnt_cnt">
            Flat
            <span style={{ float: "right", fontWeight: "bold" }}>
              {" "}
              {tenantsByAccommodation?.Flat ?? 0}
            </span>
          </p>{" "}
          <p className="tnt_cnt">
            Tenament
            <span style={{ float: "right", fontWeight: "bold" }}>
              {" "}
              {tenantsByAccommodation?.Tenament ?? 0}
            </span>
          </p>{" "}
          <p className="tnt_cnt">
            Other
            <span style={{ float: "right", fontWeight: "bold" }}>
              {" "}
              {tenantsByAccommodation?.Other ?? 0}
            </span>
          </p>
        </Col>
      </Row>
    </div>
  );
}
