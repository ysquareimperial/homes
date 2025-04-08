import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Col, Row } from "reactstrap";
import { useQuery } from "../components/helpers";

export default function RequestMaintenance() {
  const navigate = useNavigate();
  const query = useQuery();
  const tenantId = query.get("tenant_id");
  const propertyId = query.get("property_id");

  const [formData, setFormData] = useState({
    tenant_name: "",
    phone_number: "",
    accommodation: "",
    description: "",
    category: "",
    priority: "Medium",
    status: "Pending", // always default
    tenant_id: parseInt(tenantId, 10),
    property_id: parseInt(propertyId, 10),
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const token = localStorage.getItem("access_token");

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://projectestate.onrender.com/api/maintenance",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Assuming success means 201 or 200
      if (response.status === 201 || response.status === 200) {
        console.log(response);

        // alert("Maintenance request submitted successfully!");
        navigate("/tenant/maintenance-history"); // change to your desired route
      }
    } catch (error) {
      console.error("Submission failed:", error);
      // alert("Failed to submit request.");
    } finally {
      setLoading(false);
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
            name="category"
            className="inputs"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Low">Electricity</option>
            <option value="Medium">Plumbing</option>
            <option value="High">Other</option>
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
