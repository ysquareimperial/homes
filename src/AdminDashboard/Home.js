import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "reactstrap";
import { BsClockHistory, BsClock } from "react-icons/bs";
import { MdMapsHomeWork } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import "../Operator/Chart.css";
import DoughnutChart from "../Operator/Doughnut";
import BarChart from "../Operator/BarChart";
import { TfiDownload } from "react-icons/tfi";
import TenantsByAccommodation from "../Operator/TenantsByAccommodation";
import { FaCalendar, FaUser } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
export default function Home() {
  const token = localStorage.getItem("access_token");
  const [loading1, setLoading1] = useState(false);
  const [upcomingRents, setUpcomingRents] = useState([]);
  const [totalProperties, setTotalProperties] = useState(null);
  const [totalTenants, setTotalTenants] = useState(null);
  const [rentDues, setRentDues] = useState([]);
  const [data, setData] = useState([]);

  const fetchUpcomingRents = () => {
    setLoading1(true);

    if (!token) {
      console.error("No access token found");
      setLoading1(false);
      return;
    }
    axios
      .get("https://projectestate.onrender.com/api/dashboard/upcoming-rents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading1(false);
        setUpcomingRents(response?.data);
        console.log(response);
        console.log("upcoming rents");
      })
      .catch((err) => {
        setLoading1(false);
        console.log("error fetching data", err);
      });
  };
  const fetchUpcomingRentsDue = () => {
    setLoading1(true);

    if (!token) {
      console.error("No access token found");
      setLoading1(false);
      return;
    }
    axios
      .get("https://projectestate.onrender.com/api/dashboard/rent-dues", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading1(false);
        setRentDues(response?.data);
        console.log(response);
        console.log("rents due count");
      })
      .catch((err) => {
        setLoading1(false);
        console.log("rents due count");
        console.log("error fetching data", err);
      });
  };

  const fetchTotalProperties = () => {
    setLoading1(true);

    if (!token) {
      console.error("No access token found");
      setLoading1(false);
      return;
    }
    axios
      .get(
        "https://projectestate.onrender.com/api/dashboard/total-properties",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setLoading1(false);
        setTotalProperties(response?.data);
        console.log(response);
        console.log("dddddddddddddddddddd");
      })
      .catch((err) => {
        setLoading1(false);
        console.log("error fetching data", err);
      });
  };

  const fetchTotalTenants = () => {
    setLoading1(true);

    if (!token) {
      console.error("No access token found");
      setLoading1(false);
      return;
    }
    axios
      .get("https://projectestate.onrender.com/api/dashboard/total-tenants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading1(false);
        setTotalTenants(response?.data);
        console.log(response);
        console.log("dddddddddddddddddddd");
      })
      .catch((err) => {
        setLoading1(false);
        console.log("error fetching data", err);
      });
  };
  useEffect(() => {
    fetchUpcomingRents();
    fetchUpcomingRentsDue();
    fetchTotalProperties();
    fetchTotalTenants();
  }, [token]);

  // Fetch data from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = localStorage.getItem("authToken"); // or get it from context/state

        const response = await fetch(
          "https://projectestate.onrender.com/api/dashboard/summary",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add token here
            },
          }
        );

        const json = await response.json();
        setData(json);
        console.log(json);
        console.log("alllll");
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Download as CSV
  const downloadCSV = () => {
    if (!data.length) return;

    // Remove 'id' and add 'S/N' as the first column
    const originalHeaders = Object.keys(data[0]).filter((key) => key !== "id");
    const headers = ["S/N", ...originalHeaders]; // Include S/N as the first column
    const csvRows = [headers.join(",")];

    data.forEach((row, index) => {
      const values = [index + 1]; // S/N starts from 1
      originalHeaders.forEach((header) => {
        values.push(`"${row[header]}"`);
      });
      csvRows.push(values.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Download as Excel
  const downloadExcel = () => {
    if (!data.length) return;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "data.xlsx");
  };

  return (
    <div className="outlet_">
      <div className="d-flex justify-content-end">
        <button className="mt-4 download-tenants" onClick={downloadCSV}>
          <div className="dashboard_icon_divv">
            <div>
              Tenants Record <TfiDownload size="2.5em" className="icon_divv" />
              {/* <BsClockHistory size="2.5em" className="icon_div1" /> */}
            </div>
          </div>
        </button>
      </div>
      <Row className="mt-2 m-0">
        <Col lg={3}>
          <Card className="dashboard_card p-3 shadow-sm">
            {loading1 ? (
              <div className="d-flex justify-content-center p-4">
                <div class="auth_btn_loader" style={{ color: "grey" }}>
                  <span
                    style={{ width: "1rem", height: "1rem" }}
                    class="spinner-border"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
            ) : (
              <Row>
                <Col lg={3} md={3} sm={3} xs={3}>
                  <div className="dashboard_icon_div1">
                    <div>
                      <BsClockHistory size="2.5em" className="icon_div1" />
                    </div>
                  </div>
                </Col>
                <Col lg={9} md={9} sm={9} xs={9}>
                  <div className="dashboard_card_details">
                    <div>
                      <p className="d_count">{upcomingRents?.length}</p>
                      <p className="d_text"> Upcoming Rents</p>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
        <Col lg={3}>
          {/* <button className="action-btn" onClick={downloadExcel}>All Tenants.Excel</button> */}
          <Card className="dashboard_card p-3 shadow-sm">
            {loading1 ? (
              <div className="d-flex justify-content-center p-4">
                <div class="auth_btn_loader" style={{ color: "grey" }}>
                  <span
                    style={{ width: "1rem", height: "1rem" }}
                    class="spinner-border"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
            ) : (
              <Row>
                <Col lg={3} md={3} sm={3} xs={3}>
                  <div className="dashboard_icon_div2">
                    <div>
                      <BsClock size="2.5em" className="icon_div2" />
                    </div>
                  </div>
                </Col>
                <Col lg={9} md={9} sm={9} xs={9}>
                  <div className="dashboard_card_details">
                    <div>
                      <p className="d_count">{rentDues?.length}</p>
                      <p className="d_text"> Rents Due</p>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="dashboard_card p-3 shadow-sm">
            {loading1 ? (
              <div className="d-flex justify-content-center p-4">
                <div class="auth_btn_loader" style={{ color: "grey" }}>
                  <span
                    style={{ width: "1rem", height: "1rem" }}
                    class="spinner-border"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
            ) : (
              <Row>
                <Col lg={3} md={3} sm={3} xs={3}>
                  <div className="dashboard_icon_div3">
                    <div>
                      <MdMapsHomeWork size="2.5em" className="icon_div3" />
                    </div>
                  </div>
                </Col>
                <Col lg={9} md={9} sm={9} xs={9}>
                  <div className="dashboard_card_details">
                    <div>
                      <p className="d_count">{totalProperties}</p>
                      <p className="d_text">Properties</p>
                    </div>
                  </div>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="dashboard_card p-3 shadow-sm">
            {loading1 ? (
              <div className="d-flex justify-content-center p-4">
                <div class="auth_btn_loader" style={{ color: "grey" }}>
                  <span
                    style={{ width: "1rem", height: "1rem" }}
                    class="spinner-border"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
            ) : (
              <Row>
                <Col lg={3} md={3} sm={3} xs={3}>
                  <div className="dashboard_icon_div4">
                    <div>
                      <ImUsers size="2.5em" className="icon_div4" />
                    </div>
                  </div>
                </Col>
                <Col lg={9} md={9} sm={9} xs={9}>
                  <p className="d_count">{totalTenants}</p>
                  <p className="d_text">Tenants</p>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card
            className="dashboard_card p-3 mt-4 shadow-sm"
            style={{ height: "20vh" }}
          >
            <p className="d_count">Upcoming Rents</p>
            {upcomingRents?.map((item, index) => (
              <marquee
                behavior="scroll"
                direction="up"
                onmouseover="stop();"
                onmouseout="start();"
                scrolldelay="200"
                height="200"
              >
                <div style={{ marginBottom: 30 }} className="">
                  <p
                    className="marq_el"
                    style={{ margin: 0, marginRight: 10, display: "inline" }}
                  >
                    <MdMapsHomeWork
                      className="not_icon"
                      size="1em"
                      color="grey"
                    />{" "}
                    {item.property_name}
                  </p>
                  <p
                    className="marq_el"
                    style={{ margin: 0, marginRight: 10, display: "inline" }}
                  >
                    <FaCalendar className="not_icon" size="1em" color="grey" />{" "}
                    Date: {item.expiry}
                  </p>
                </div>
              </marquee>
            ))}
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6} sm={12} xs={12}>
          <Card className="dashboard_card ch p-3 mt-4 shadow-sm">
            <BarChart />
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard_card ch p-3 mt-4 shadow-sm">
            <TenantsByAccommodation />
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard_card ch p-3 mt-4 shadow-sm">
            <p className="d_text text-center">Tenants by gender</p>
            <hr></hr>
            <Row>
              <Col lg={2} md={2} sm={2} xs={2}></Col>
              <Col lg={8} md={8} sm={8} xs={8}>
                {/* <Chart /> */}
                <DoughnutChart />
              </Col>
              <Col lg={2} md={2} sm={2} xs={2}></Col>
            </Row>
            <Row className="mt-2 text-center">
              <Col lg={2} md={2} sm={2} xs={2}></Col>
              <Col lg={4} md={4} sm={4} xs={4}>
                <p
                  className="d_text_m"
                  style={{
                    color: "white",
                    backgroundColor: "rgba(104, 104, 104, 0.6)",
                    padding: 5,
                    borderRadius: 5,
                    fontSize: 13,
                  }}
                >
                  Male
                </p>
              </Col>
              <Col lg={5} md={5} sm={5} xs={5}>
                <p
                  className="d_text_m"
                  style={{
                    color: "grey",
                    backgroundColor: "rgba(190, 190, 190, 0.6)",
                    padding: 5,
                    borderRadius: 5,
                    fontSize: 13,
                  }}
                >
                  Female
                </p>
              </Col>
              <Col lg={1} md={1} sm={1} xs={1}></Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
