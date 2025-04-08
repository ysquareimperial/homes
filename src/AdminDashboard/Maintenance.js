import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Col, Row } from "reactstrap";
import Button from "./Button";
import moment from "moment";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Maintenance = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [maintenanceHist, setMaintenanceHist] = useState([]);
  const [loading, setLoading] = useState(false);
  const toggleShowMore = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const fetchMaintenance = () => {
    setLoading(true);

    if (!token) {
      console.error("No access token found");
      setLoading(false);
      return;
    }

    axios
      .get("https://projectestate.onrender.com/api/maintenance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setMaintenanceHist(response?.data);
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error fetching data", err);
      });
  };

  useEffect(() => {
    fetchMaintenance();
  }, [token]);

  return (
    <div className="outlet_ ">
      {/* <Card className="admin-card p-3"> */}
      <Row className="mt-3 m-0">
        <Col md={6}>
          <h3>Maintenance requests</h3>
        </Col>
        <Col md={6}></Col>
      </Row>
      <Table className="mt-3 border-collapse w-full">
        <Thead>
          <Tr className="bg-gray-200">
            <Th className="p-2 border">Property</Th>
            <Th className="p-2 border">Tenant</Th>
            <Th className="p-2 border">Phone</Th>
            <Th className="p-2 border">Date</Th>
            {/* <Th className="p-2 border">Category</Th> */}
            <Th className="p-2 border">Details</Th>
            <Th className="p-2 border">Priority</Th>
          </Tr>
        </Thead>
        <Tbody>
          {maintenanceHist.map((item, index) => (
            <Tr key={index} className="border-b">
              <Td className="p-2 border">{item.property_name}</Td>
              <Td className="p-2 border">{item.tenant_name}</Td>
              <Td className="p-2 border">{item.phone_number}</Td>
              <Td className="p-2 border">
                {moment(item?.created_at).format("MMMM D, YYYY h:mm A")}
              </Td>

              {/* <Td className="p-2 border">{item.category}</Td> */}
              <Td className="p-2 border">
                {expandedRows[index] || item.description?.length <= 50
                  ? item.description
                  : `${item.description.substring(0, 50)}... `}
                {item.description?.length > 50 && (
                  <span
                    onClick={() => toggleShowMore(index)}
                    className="text-primary underline"
                  >
                    {" "}
                    {expandedRows[index] ? "Less" : "More"}
                  </span>
                )}
              </Td>
              <Td className="p-2 border">{item.priority}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Maintenance;
