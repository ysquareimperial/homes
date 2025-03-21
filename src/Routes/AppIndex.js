import React from "react";
import { Outlet } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Navbar from "../Menu.js/Navbar";
import Sidebar from "../Menu.js/Sidebar";

export default function AppIndex() {
  return (
    <div>
      <div className="mobile_navbar" style={{ marginBottom: 200 }}>
        <Navbar />
      </div>

      <Row className="m-0">
        <Col className="m-0 sidebarr" md={2}>
          <Sidebar />
        </Col>
        <Col md={10}>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}
