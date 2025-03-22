import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Col, Row } from "reactstrap";

export default function CreatePM() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true);
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("No access token found");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://projectestate.onrender.com/api/properties/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Property created successfully", response);
        setLoading(false);
        navigate("/admin/PM");  
      } else {
        console.error("Unexpected response status:", response.status);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(
        "Error creating property:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div className="outlet_">
      {/* <Card className="admin-card p-3"> */}
        <h3 className="mt-4">Add property</h3>
        <Row>
          <Col md={6}>
            <div>
              <input
                type="text"
                name="name"
                className="inputs"
                placeholder="Property name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </Col>
          <Col md={6}>
            <div>
              <input
                type="text"
                name="address"
                className="inputs"
                placeholder="Property address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </Col>
        </Row>  
        <div className="mt-3">
          <button className="action-btn shadow" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      {/* </Card> */}
    </div>
  );
}
