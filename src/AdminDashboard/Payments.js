import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Col, Row } from "reactstrap";

function Payments() {
  const paymentsData = [
    {
      tenant: "Habu Yakasai",
      phone: "+234 090 3334 434",
      paymentDate: "15/03/2024",
      amountPaid: "₦100,000",
      //   paymentMethod: "Bank Transfer",
      //   paymentReference: "TXN123456789",
      status: "Paid",
      balanceDue: "₦0",
      receiptUrl: "https://example.com/receipt1.pdf",
    },
    {
      tenant: "Aisha Bello",
      phone: "+234 080 5555 678",
      paymentDate: "20/03/2024",
      amountPaid: "₦50,000",
      //   paymentMethod: "Cash",
      //   paymentReference: "TXN987654321",
      status: "Pending",
      balanceDue: "₦50,000",
      receiptUrl: "https://example.com/receipt2.pdf",
    },
    {
      tenant: "John Doe",
      phone: "+234 081 2222 345",
      paymentDate: "10/02/2024",
      amountPaid: "₦120,000",
      //   paymentMethod: "Card Payment",
      //   paymentReference: "TXN567890123",
      status: "Paid",
      balanceDue: "₦0",
      receiptUrl: "https://example.com/receipt3.pdf",
    },
  ];
  return (
    <div className="outlet_">
      {/* <Card className="admin-card p-3"> */}
      <Row className="mt-3 m-0">
        <Col md={6}>
          <h3 className="">Payments</h3>
        </Col>
        <Col md={6}>
          {/* <Button btnText='Edit PM' icon={<FaPen />} style={{ float: 'right' }} onClick={() => navigate('')} /> */}
        </Col>
      </Row>
      <Table className="mt-3 border-collapse w-full">
        <Thead>
          <Tr>
            <Th className="p-2 border">Tenant</Th>
            <Th className="p-2 border">Phone</Th>
            <Th className="p-2 border">Payment Date</Th>
            <Th className="p-2 border">Amount Paid</Th>
            {/*   <Th className="p-2 border">Payment Method</Th>
              <Th className="p-2 border">Payment Reference</Th> */}
            <Th className="p-2 border">Status</Th>
            <Th className="p-2 border">Balance Due</Th>
            <Th className="p-2 border">Receipt</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paymentsData.map((item, index) => (
            <Tr key={index} className="border-b">
              <Td className="p-2 border">{item.tenant}</Td>
              <Td className="p-2 border">{item.phone}</Td>
              <Td className="p-2 border">{item.paymentDate}</Td>
              <Td className="p-2 border">{item.amountPaid}</Td>
              {/*  <Td className="p-2 border">{item.paymentMethod}</Td> */}
              {/*  <Td className="p-2 border">{item.paymentReference}</Td> */}
              <Td
                className={
                  item.status === "Paid"
                    ? "text-success p-2 border"
                    : "text-warning p-2 border"
                }
              >
                {item.status}
              </Td>
              <Td className="p-2 border">{item.balanceDue}</Td>
              <Td className="p-2 border">
                <a
                  href={item.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Receipt
                </a>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default Payments;
