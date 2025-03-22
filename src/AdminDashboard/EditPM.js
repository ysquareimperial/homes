import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import axios from "axios";
import Button from "./Button";

export default function EditPM() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get("id");
  const propertyName = queryParams.get("name");
  const propertyAddress = queryParams.get("address");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: propertyName,
    address: propertyAddress,
  });

  const token = localStorage.getItem("access_token"); // Get the token from local storage

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    setLoading(true);
    axios
      .put(
        `https://projectestate.onrender.com/api/properties/${propertyId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.status === 200) {
          navigate(-1);
        }
        // alert("Property updated successfully!");
        // navigate("/admin/PM");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error updating property:", error);
        alert("Failed to update property");
      });
  };

  return (
    <div className="outlet_">
      <h3 className="mt-3">Edit Property</h3>
      <Row>
        <Col md={6}>
          <input
            type="text"
            className="inputs"
            placeholder="Property name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Col>
        <Col md={6}>
          <input
            type="text"
            className="inputs"
            placeholder="Property address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <div className="mt-3">
        <Button
          btnText={loading ? "Saving..." : "Save"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
