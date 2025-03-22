import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Col, Modal, ModalBody, Row } from "reactstrap";

function Register() {
  const [open1, setOpen1] = useState(false);
  const toggle1 = () => {
    setOpen1(!open1);
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    phone: "",
    email: "",
    location: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://projectestate.onrender.com/api/create_user/",
        formData
      );
      console.log("User created:", response.data);

      toggle1();
      // navigate("/admin/home"); // Navigate after successful registration
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed. Try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="m-0 d-flex align-items-center justify-content-center mt-5">
      <Col md={4}></Col>

      <Col md={4} className="w-30">
      <div className="text-center mb-3">
          <img src={pj} style={{ width: 80 }} />
        </div>
        <h3>Register</h3>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit} className="">
          <div>
            <label
              style={{
                marginTop: 10,
                display: "block",
                fontSize: 12,
                color: "grey",
              }}
            >
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              className="input_field mt-1"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              style={{
                marginTop: 10,
                display: "block",
                fontSize: 12,
                color: "grey",
              }}
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              className="input_field mt-1"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              style={{
                marginTop: 10,
                display: "block",
                fontSize: 12,
                color: "grey",
              }}
            >
              DOB
            </label>
            <input
              type="date"
              name="dob"
              className="input_field mt-1"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              style={{
                marginTop: 10,
                display: "block",
                fontSize: 12,
                color: "grey",
              }}
            >
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              className="input_field mt-1"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              style={{
                marginTop: 10,
                display: "block",
                fontSize: 12,
                color: "grey",
              }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="input_field mt-1"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              style={{
                marginTop: 10,
                display: "block",
                fontSize: 12,
                color: "grey",
              }}
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              className="input_field mt-1"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              style={{
                marginTop: 10,
                display: "block",
                fontSize: 12,
                color: "grey",
              }}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="input_field mt-1"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="action-btn w-100 mt-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p
          className="mt-3 small"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Already have an account? <b>Log in here</b>
        </p>
      </Col>
      <Col md={4}></Col>

      <Modal
        size="sm"
        isOpen={open1}
        className="avail-cars"
        style={{ padding: 0 }}
      >
        <ModalBody className="modal-body">
          <div className="menu-div">
            <p>You're all set! Registration was successful.</p>
            <p className="p-menu" onClick={() => navigate("/")}>
              Login
            </p>
          </div>
        </ModalBody>
      </Modal>
    </Row>
  );
}

export default Register;
