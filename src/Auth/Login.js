import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { Col, Row, Card } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "../Styles/Styles.css";
import pjey from "../Images/pj.png";

import cover from "../Images/estate.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.replace(/\s/g, "") }); // Prevent spaces
  };

  const handleSubmit = () => {
    setLoading(true);
    setError("");

    const requestData = qs.stringify({
      grant_type: "password",
      username: formData.username,
      password: formData.password,
      scope: "",
    });

    axios
      .post(`https://projectestate.onrender.com/api/login_user`, requestData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          console.log(response);

          const token = response?.data?.access_token;
          const role = response?.data?.role;
          const name =
            response?.data?.firstname + " " + response?.data?.lastname;
          const email = response?.data?.email;
          if (token) {
            localStorage.setItem("access_token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
          }
          if (response.data.role === "landlord") {
            navigate("/admin/home");
          } else {
            navigate("/tenant/home");
          }
        }
      })
      .catch((e) => {
        setLoading(false);
        setError(e.response?.data?.detail || "An error occurred. Try again.");
      });
  };

  return (
    <Row className="m-0 d-flex align-items-center justify-content-center mt-5">
      <Col md={4}></Col>

      <Col md={4} className="w-30">
        <div className="text-center mb-3">
          <img src={pjey} style={{ width: 80 }} />
        </div>
        <h3>Login</h3>
        <div>
          <input
            className="input_field"
            autoComplete="off"
            placeholder="Email"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="input_field"
            autoComplete="off"
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <p className="error-text">{error}</p>}
        <p className="forgot">Forgot password?</p>
        <div>
          <button
            className="action-btn w-100"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        <p className="mt-3 small" onClick={() => navigate("/register")}>
          Don't have an account? <b>Create new account</b>
        </p>
      </Col>
      <Col md={4}></Col>
    </Row>
  );
}
