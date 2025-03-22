import { useState } from "react";
import { GrVmMaintenance } from "react-icons/gr";
import { MdMoney } from "react-icons/md";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

const rentData = [
  {
    name: "Habu Yakasai",
    address: "12, Main Street, Abuja",
    duration: "1 year",
    rentFee: "₦ 100,000",
    paymentStatus: "Paid",
  },
  {
    name: "Aisha Bello",
    address: "45, Market Road, Kano",
    duration: "6 months",
    rentFee: "₦ 50,000",
    paymentStatus: "Pending",
  },
  {
    name: "John Doe",
    address: "78, Commercial Avenue, Lagos",
    duration: "2 years",
    rentFee: "₦ 200,000",
    paymentStatus: "Paid",
  },
];

const Rent = () => {
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
          <h3>Rents</h3>
        </Col>
        <Col md={6}>
          {/* <Button btnText='Edit PM' icon={<FaPen />} style={{ float: 'right' }} onClick={() => navigate('')} /> */}
        </Col>
      </Row>
      <Table className="table-auto border-collapse w-full mt-3">
        <Thead>
          <Tr>
            <Th className="p-2 border">Name</Th>
            <Th className="p-2 border">Address</Th>
            <Th className="p-2 border">Duration</Th>
            <Th className="p-2 border">Rent Fee</Th>
            <Th className="p-2 border">Payment Status</Th>
            <Th className="p-2 border">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rentData.map((tenant, index) => (
            <Tr key={index}>
              <Td className="p-2 border">{tenant.name}</Td>
              <Td className="p-2 border">{tenant.address}</Td>
              <Td className="p-2 border">{tenant.duration}</Td>
              <Td className="p-2 border">{tenant.rentFee}</Td>
              <Td
                className={`p-2 border ${
                  tenant.paymentStatus === "Paid"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {tenant.paymentStatus}
              </Td>
              <Td className="p-2 border flex gap-2 justify-center">
                <div className="d-flex gap-3">
                  <MdMoney size="1.4em" />
                  <GrVmMaintenance
                    size="1.4em"
                    onClick={() => navigate("/tenant/request-maintenance")}
                  />
                </div>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Rent;
