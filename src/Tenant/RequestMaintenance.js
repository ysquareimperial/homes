import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Col, Row } from "reactstrap";

export default function RequestMaintenance() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenantName: "",
    phone: "",
    category: "",
    details: "",
    priority: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        "https://projectestate.onrender.com/api/maintenance/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Maintenance request created successfully", response);
        setLoading(false);
        navigate("/admin/maintenance");
      } else {
        console.error("Unexpected response status:", response.status);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(
        "Error creating maintenance request:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div className="outlet_">
      <h3 className="mt-4">Maintenance request</h3>
      {/* <Row>
        <Col md={6}>
          <input
            type="text"
            name="tenantName"
            className="inputs"
            placeholder="Tenant Name"
            value={formData.tenantName}
            onChange={handleChange}
          />
        </Col>
        <Col md={6}>
          <input
            type="text"
            name="phone"
            className="inputs"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
        </Col>
      </Row> */}
      <Row className="mt-3">
        <Col md={6}>
          <select
            name="category"
            className="inputs"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Structural">Structural</option>
            <option value="Other">Other</option>
          </select>
        </Col>
        <Col md={6}>
          <select
            name="priority"
            className="inputs"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="">Select Priority</option>

            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <textarea
            name="details"
            className="inputs"
            placeholder="Maintenance Details"
            value={formData.details}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <div className="mt-3">
        <button
          className="action-btn shadow"
          onClick={() => navigate("/tenant/maintenance-history")}
          disabled={loading}
        >
          {loading ? "Saving..." : "Submit Request"}
        </button>
      </div>
    </div>
  );
}
