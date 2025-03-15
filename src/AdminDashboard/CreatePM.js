import React from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";
import Button from "./Button";

export default function CreatePM() {
  const navigate = useNavigate();

  return (
    <div className="mt-4">
      <Card className="admin-card p-3">
        <p className="card-title">Add property</p>
        <Row>
          <Col md={6}>
            <div>
              <input
                type="address"
                className="inputs"
                placeholder="Property name"
              />
            </div>
          </Col>
          <Col md={6}>
            <div>
              <input
                type="text"
                className="inputs"
                placeholder="Property address"
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="select">
              <select>
                <option>-Add blocks-</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </div>
          </Col>
        </Row>
        <div className="mt-3">
          <Button
            btnText={"Save"}
            icon={<FaSave />}
            onClick={() => navigate("/admin/PM")}
          />
        </div>
      </Card>
    </div>
  );
}
