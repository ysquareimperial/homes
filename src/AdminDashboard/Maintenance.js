import { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Col, Row } from "reactstrap";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const maintenanceData = [
  {
    tenant: "Habu Yakasai",
    phone: "+234 090 3334 434",
    date: "10/10/2020",
    category: "Plumbing",
    details:
      "Leaking pipe in the bathroom causing water damage to the floor. Needs urgent repair.",
    priority: "High",
  },
  {
    tenant: "Aisha Bello",
    phone: "+234 080 5555 678",
    date: "10/10/2020",
    category: "Electrical",
    details:
      "Frequent power tripping in the living room. Possible wiring issue.",
    priority: "Medium",
  },
  {
    tenant: "John Doe",
    phone: "+234 081 2222 345",
    date: "10/10/2020",
    category: "Carpentry",
    details:
      "Broken door hinge in the kitchen. Needs fixing before it falls off completely.",
    priority: "Low",
  },
];

const Maintenance = () => {
  const [expandedRows, setExpandedRows] = useState({});
  
  const navigate = useNavigate();
  const toggleShowMore = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="outlet_ ">
      {/* <Card className="admin-card p-3"> */}
      <Row className="mt-3 m-0">
        <Col md={6}>
          <h3>Maintenance requests</h3>
        </Col>
        <Col md={6}>
       
        </Col>
      </Row>
      <Table className="mt-3 border-collapse w-full">
        <Thead>
          <Tr className="bg-gray-200">
            <Th className="p-2 border">Tenant</Th>
            <Th className="p-2 border">Phone</Th>
            <Th className="p-2 border">Date</Th>
            <Th className="p-2 border">Category</Th>
            <Th className="p-2 border">Details</Th>
            <Th className="p-2 border">Priority</Th>
          </Tr>
        </Thead>
        <Tbody>
          {maintenanceData.map((item, index) => (
            <Tr key={index} className="border-b">
              <Td className="p-2 border">{item.tenant}</Td>
              <Td className="p-2 border">{item.phone}</Td>
              <Td className="p-2 border">{item.date}</Td>
              <Td className="p-2 border">{item.category}</Td>
              <Td className="p-2 border">
                {expandedRows[index] || item.details.length <= 50
                  ? item.details
                  : `${item.details.substring(0, 50)}... `}
                {item.details.length > 50 && (
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
