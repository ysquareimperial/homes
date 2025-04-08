import { useEffect, useState } from "react";
import { GrVmMaintenance } from "react-icons/gr";
import { MdMoney } from "react-icons/md";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Col, Modal, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import { TbCreditCardPay } from "react-icons/tb";
import axios from "axios";

const Rent = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rents, setRents] = useState([]);
  const [modal, setModal] = useState(false);
  const toggleShowMore = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const handleModal = () => {
    setModal(!modal);
  };
  const token = localStorage.getItem("access_token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const [amount, setAmount] = useState(null);
  const publicKeyTestPaystack =
    "pk_test_ac95b08abbda866c61e311476591cec34beaa2ed";
  //PAYSTACK COMPUTATION
  let paystackTotalPriceInKobo = amount * 100;
  paystackTotalPriceInKobo += paystackTotalPriceInKobo * 0.025;
  if (paystackTotalPriceInKobo >= 250000) {
    paystackTotalPriceInKobo += 10000;
  }

  const generateTransactionRef = () => {
    const prefix = "HTSH";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const randomPart = Array.from({ length: 12 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
    return `${prefix}${randomPart}`;
  };

  // P A Y S T A C K
  const componentProps = {
    email: email,
    amount: paystackTotalPriceInKobo,
    metadata: {
      name,
    },
    publicKey: publicKeyTestPaystack,
    text: (
      <img
        src={`https://res.cloudinary.com/dkwy56ghj/image/upload/v1730577268/paystack_qijriq.png`}
        alt="paystack_logo"
        style={{ width: 70 }}
      />
    ),
    reference: generateTransactionRef(),
    onSuccess: (response) => {
      console.log(response);
      handleModal();
    },
    onClose: () => {
      console.log("closed");
      handleModal();
    },
  };

  const fetchRents = () => {
    setLoading(true);

    if (!token) {
      console.error("No access token found");
      setLoading(false);
      return;
    }

    axios
      .get("https://projectestate.onrender.com/api/rents/my-rents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setRents(response?.data);
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error fetching data", err);
      });
  };

  useEffect(() => {
    fetchRents();
  }, [token]);

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
        <div>
          {rents?.length === 0 ? (
            <div className="text-center">
              <span>No rents found</span>
            </div>
          ) : (
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
                {rents.map((tenant, index) => (
                  <Tr key={index}>
                    <Td className="p-2 border">{tenant.property_name}</Td>
                    <Td className="p-2 border">{tenant.property_address}</Td>
                    <Td className="p-2 border">{tenant.rent_duration}</Td>
                    <Td className="p-2 border">₦{tenant.rent_fee}</Td>
                    <Td
                      className={`p-2 border ${
                        tenant.paymentStatus === "Paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      Paid
                    </Td>
                    <Td className="p-2 border flex gap-2 justify-center">
                      <div className="d-flex gap-3">
                        <TbCreditCardPay
                          size="1.4em"
                          onClick={() => {
                            handleModal();
                            setAmount(tenant?.rent_fee);
                          }}
                        />
                        <GrVmMaintenance
                          size="1.4em"
                          onClick={() =>
                            navigate(
                              `/tenant/request-maintenance?property_id=${tenant?.property_id}&tenant_id=${tenant?.tenant_id}`
                            )
                          }
                        />
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </div>
      )}
      <Modal size="sm" isOpen={modal} toggle={handleModal}>
        <div className="pay_badge m-0 mt-1 p-2">
          <h6>Choose payment method</h6>
          <PaystackButton className="paystack_button" {...componentProps} />
        </div>
      </Modal>
    </div>
  );
};

export default Rent;
