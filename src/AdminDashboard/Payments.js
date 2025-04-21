import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
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

  const [payments, setPayments] = useState([]);
  const token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(false);

  const fetchPayments = () => {
    setLoading(true);

    if (!token) {
      console.error("No access token found");
      setLoading(false);
      return;
    }

    axios
      .get("https://projectestate.onrender.com/api/payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setPayments(response?.data);
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error fetching data", err);
      });
  };

  useEffect(() => {
    fetchPayments();
  }, [token]);
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
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
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
        <>
          {payments?.length === 0 ? (
            <div className="text-center">
              <span>No payments found</span>
            </div>
          ) : (
            <Table className="mt-3 border-collapse w-full">
              <Thead>
                <Tr>
                  <Th className="p-2 border">Property</Th>
                  {/* <Th className="p-2 border">Phone</Th> */}
                  <Th className="p-2 border">Payment Date</Th>
                  <Th className="p-2 border">Amount Paid</Th>
                  {/*   <Th className="p-2 border">Payment Method</Th>
              <Th className="p-2 border">Payment Reference</Th> */}
                  <Th className="p-2 border">Status</Th>
                  {/* <Th className="p-2 border">Balance Due</Th> */}
                  {/* <Th className="p-2 border">Receipt</Th> */}
                </Tr>
              </Thead>
              <Tbody>
                {payments.map((item, index) => (
                  <Tr key={index} className="border-b table_row">
                    <Td className="p-2 border">{item.property_name}</Td>
                    {/* <Td className="p-2 border">{item.phone}</Td> */}
                    <Td className="p-2 border">
                      {moment(item?.payment_datetime).format(
                        "MMMM D, YYYY h:mm A"
                      )}
                    </Td>
                    <Td className="p-2 border">{item.amount}</Td>
                    {/*  <Td className="p-2 border">{item.paymentMethod}</Td> */}
                    {/*  <Td className="p-2 border">{item.paymentReference}</Td> */}
                    <Td
                      className={
                        item.status === "success"
                          ? "text-success p-2 border"
                          : "text-warning p-2 border"
                      }
                    >
                      {item.status}
                    </Td>
                    {/* <Td className="p-2 border">{item.balanceDue}</Td> */}
                    {/* <Td className="p-2 border">
                      <a
                        href={item.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Receipt
                      </a>
                    </Td> */}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </>
      )}
    </div>
  );
}

export default Payments;
