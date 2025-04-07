import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Col, Row } from "reactstrap";

export default function RequestMaintenance() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenant_name: "",
    phone_number: "",
    accommodation: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    tenant_id: 0,
    property_id: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "tenant_id" || name === "property_id"
          ? parseInt(value, 10)
          : value,
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("No access token found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://projectestate.onrender.com/api/maintenance_requests/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log("Maintenance request created successfully", response.data);
        setLoading(false);
        navigate("/admin/PM");
      } else {
        console.error("Unexpected response status:", response.status);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(
        "Error submitting maintenance request:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div className="outlet_">
      <h3 className="mt-4">Request Maintenance</h3>
      <Row>
        <Col md={6}>
          <input
            type="text"
            name="tenant_name"
            className="inputs"
            placeholder="Tenant Name"
            value={formData.tenant_name}
            onChange={handleChange}
          />
        </Col>
        <Col md={6}>
          <input
            type="text"
            name="phone_number"
            className="inputs"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </Col>
        <Col md={6} className="mt-3">
          <input
            type="text"
            name="accommodation"
            className="inputs"
            placeholder="Accommodation"
            value={formData.accommodation}
            onChange={handleChange}
          />
        </Col>
        <Col md={6} className="mt-3">
          <input
            type="number"
            name="tenant_id"
            className="inputs"
            placeholder="Tenant ID"
            value={formData.tenant_id}
            onChange={handleChange}
          />
        </Col>
        <Col md={6} className="mt-3">
          <input
            type="number"
            name="property_id"
            className="inputs"
            placeholder="Property ID"
            value={formData.property_id}
            onChange={handleChange}
          />
        </Col>
        <Col md={6} className="mt-3">
          <select
            name="priority"
            className="inputs"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </Col>
        <Col md={6} className="mt-3">
          <select
            name="status"
            className="inputs"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </Col>
        <Col md={12} className="mt-3">
          <textarea
            name="description"
            className="inputs"
            placeholder="Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
        </Col>
      </Row>

      <div className="mt-4">
        <button
          className="action-btn shadow"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </div>
  );
}
