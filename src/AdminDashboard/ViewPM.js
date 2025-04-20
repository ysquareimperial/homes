import React, { useEffect, useState } from "react";
import { Eye, PlusSquare } from "react-feather";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Card, Col, Modal, ModalBody, Row } from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Button from "./Button";
import { useQuery } from "../components/helpers";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { HiOutlinePlus } from "react-icons/hi";

export default function ViewPM() {
  const getInitials = (name) => {
    const words = name.trim().split(" ");
    return words.length > 1
      ? `${words[0][0]}${words[1][0]}` // First character of the first two words
      : words[0][0]; // First character if there's only one word
  };
  const query = useQuery();
  const propertyId = query.get(`id`);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState([]);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [error, setError] = useState(null);
  const [blockId, setBlockId] = useState(null);
  const [open1, setOpen1] = useState(false);
  const toggle1 = () => {
    setOpen1(!open1);
  };
  const [open2, setOpen2] = useState(false);
  const toggle2 = () => {
    setOpen2(!open2);
  };
  const [open3, setOpen3] = useState(false);
  const toggle3 = () => {
    setOpen3(!open3);
  };

  const token = localStorage.getItem("access_token");

  const [formData, setFormData] = useState({
    blockName: "",
  });

  const [formData2, setFormData2] = useState({
    name: "",
    phone: "",
    sex: "",
    purpose: "",
    accommodation: "",
    duration: "",
    rent: "",
    email: "",
    expiry: "",
    image_urls: [],
  });

  const [files, setFiles] = useState(null);
  // const [maintenanceId, setMaintenanceId] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add this with your other state declarations
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChange2 = (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };
  const createBlock = async (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading2(true);
    const token = localStorage.getItem("access_token");

    try {
      const response = await axios.post(
        "https://projectestate.onrender.com/api/blocks/",
        { block_name: formData.blockName, property_id: propertyId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toggle1();
        fetchProperty();
        setFormData({ blockName: "" });
      }
      setLoading2(false);
    } catch (error) {
      setLoading2(false);
      console.error(
        "Error creating property:",
        error.response ? error.response.data : error
      );
    }
  };
  const fetchProperty = () => {
    setLoading(true);
    if (!token) {
      console.error("No access token found");
      setLoading(false);
      return;
    }

    axios
      .get(`https://projectestate.onrender.com/api/properties/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // params: {
        //   search: query, // Include the search query as a parameter
        // },
      })
      .then((response) => {
        setLoading(false);
        setProperty(response?.data);
        console.log(response);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error fetching data", err);
      });
  };

  useEffect(() => {
    fetchProperty();
  }, [token]);
  // Handle API request
  const createTenant = async () => {
    setLoading3(true);
    setError("");

    const token = localStorage.getItem("access_token"); // Fetch token

    if (!token) {
      setError("Unauthorized! Please log in.");
      setLoading3(false);
      return;
    }

    const requestBody = {
      name: formData2.name,
      phone: formData2.phone,
      sex: formData2.sex,
      purpose: formData2.purpose,
      accommodation: formData2.accommodation,
      duration: formData2.duration,
      rent: Number(formData2.rent),
      expiry: formData2.expiry,
      email: formData2.email,
      property_id: propertyId, // Replace with actual value
      block_id: blockId, // Replace with actual value
      image_urls:formData2.image_urls
    };

    try {
      const response = await axios.post(
        "https://projectestate.onrender.com/api/tenants/",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Tenant added successfully", response.data);
      setFormData2({
        name: "",
        phone: "",
        sex: "",
        purpose: "",
        accommodation: "",
        duration: "",
        rent: "",
        expiry: "",
      });
      if (response.status === 200) {
        toggle2(); // Close the form or give success feedback
        fetchProperty();
      }
    } catch (err) {
      setError(err.response?.data?.detail || "An error occurred.");
    } finally {
      setLoading3(false);
    }
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    console.log("clicked", { files });

    if (!files?.length) {
      alert("Missing files");
      return;
    }

    const formDataPayload = new FormData();
    for (let i = 0; i < files.length; i++) {
      formDataPayload.append("images", files[i]);
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://projectestate.onrender.com/api/tenants/upload_tenant_images`,
        formDataPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const uploadedImages = response.data;
      const newImageUrls = uploadedImages.map((img) => img.file_url);
      setFormData2((prev) => ({
        ...prev,
        image_urls: [...prev.image_urls, ...newImageUrls],
      }));

      console.log("Upload successful:", newImageUrls);
      alert("Upload successful!");
    } catch (error) {
      alert("Upload failed");
      console.error("Error response:", error?.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="outlet_">
      {/* <Card className="admin-card p-3"> */}
      <Row className="mt-3">
        <Col lg={6} md={6} sm={6} xs={6}>
          <h3>Property details</h3>
        </Col>
        <Col lg={6} md={6} sm={6} xs={6} className="">
          {property.name && property.address ? (
            <CiEdit
              size="1.8em"
              style={{ float: "right", cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `/admin/edit-pm?id=${property.id}&name='${property.name}&address=${property.address}`
                )
              }
            />
          ) : null}
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
        <div className="">
          <div className="d-flex align-items-center gap-3">
            <div>
              <div className="pm">
                <p className="pmsize m-0">
                  {property?.name && getInitials(property.name).toUpperCase()}
                </p>
              </div>
            </div>
            <div>
              <p className="pm-data">
                <span className="sp">Name:</span> {property?.name}
              </p>
              <p className="pm-data">
                <span className="sp">Address:</span> {property?.address}
              </p>
              <p className="pm-data">
                <span className="sp">No of Tenants:</span>{" "}
                {property?.tenant_count}
              </p>

              {/* <Button btnText='Add Block' icon={<FaPen />} onClick={() => navigate('')} /> */}
              <div className="mt-3">
                <button className="block-btn mt-2" onClick={toggle1}>
                  Add block
                </button>
              </div>
            </div>
          </div>

          <Table className="mt-3" striped responsive borderless size="sm">
            <Thead>
              <Tr>
                {/* <Th className="p-2 border">S/N</Th> */}
                <Th className="p-2 border">Blocks</Th>
                <Th className="p-2 border">Tenants</Th>
                <Th className="p-2 border">Add tenant</Th>
              </Tr>
            </Thead>
            <Tbody>
              {property?.blocks?.map((item, index) => (
                <Tr
                  className="table_row"
                  onClick={() => {
                    navigate(
                      `/admin/view-block?property_id=${property?.id}&block_id=${item?.id}`
                    );
                  }}
                  key={index}
                >
                  {/* <Th className="p-2 border" scope="row">{index + 1}</Th> */}
                  <Td className="p-2 border">{item.block_name}</Td>
                  <Td className="p-2 border">{item.tenant_count}</Td>
                  <Td className="p-2 border">
                    <div className="plus_">
                      <HiOutlinePlus
                        className=""
                        size="1em"
                        onClick={(e) => {
                          setBlockId(item?.id);
                          e.stopPropagation();
                          toggle2();
                        }}
                      />
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {/* </Card> */}
        </div>
      )}

      <Modal
        size="sm"
        isOpen={open1}
        toggle={toggle1}
        className="avail-cars"
        style={{ padding: 0 }}
      >
        <ModalBody className="modal-body">
          <div className="menu-div">
            <h6>Add Block</h6>
            <div>
              <input
                type="text"
                className="inputs"
                placeholder="Block Name"
                name="blockName"
                value={formData.blockName}
                onChange={handleChange}
              />
            </div>
            <div className="mt-3">
              <Button
                btnText={loading2 ? "Saving..." : "Save"}
                onClick={createBlock}
              />
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        size=""
        isOpen={open2}
        toggle={toggle2}
        className="avail-cars"
        style={{ padding: 0 }}
      >
        <ModalBody className="modal-body">
          <div className="menu-div">
            <h6>Add Tenant</h6>
            {/* {JSON.stringify(formData2)} */}
            <div>
              <input
                type="text"
                className="inputs"
                placeholder="Tenant Full Name"
                name="name"
                value={formData2.name}
                onChange={handleChange2}
              />
              <input
                type="text"
                className="inputs"
                placeholder="Tenant Email"
                name="email"
                value={formData2.email}
                onChange={handleChange2}
              />
              <input
                type="text"
                className="inputs"
                placeholder="Phone"
                name="phone"
                value={formData2.phone}
                onChange={handleChange2}
              />
              <div className="select">
                <select
                  name="sex"
                  value={formData2.sex}
                  onChange={handleChange2}
                >
                  <option value="">-select sex-</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="select">
                <select
                  name="purpose"
                  value={formData2.purpose}
                  onChange={handleChange2}
                >
                  <option value="">-select purpose-</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Residential">Residential</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="select">
                <select
                  name="accommodation"
                  value={formData2.accommodation}
                  onChange={handleChange2}
                >
                  <option value="">-select accommodation-</option>
                  <option value="Duplex">Duplex</option>
                  <option value="Bungalo">Bungalow</option>
                  <option value="Terrace">Terrace</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Detached">Detached</option>
                  <option value="Flat">Flat</option>
                  <option value="Tenanment">Tenament</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="select">
                <select
                  name="duration"
                  value={formData2.duration}
                  onChange={handleChange2}
                >
                  <option value="">-select duration-</option>
                  <option value="1year">1 year</option>
                  <option value="2years">2 years</option>
                  <option value="3years">3 years</option>
                  <option value="4years">4 years</option>
                  <option value="5years">5 years</option>
                </select>
              </div>
              <input
                type="number"
                className="inputs"
                placeholder="Rent"
                name="rent"
                value={formData2.rent}
                onChange={handleChange2}
              />
              <input
                type="date"
                className="inputs"
                name="expiry"
                value={formData2.expiry}
                onChange={handleChange2}
              />
              <div style={{textAlign:'left'}}>
                <p className="mt-3">Upload agreements</p>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  required
                />
                <button onClick={uploadImage} disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>

            {error && <p className="error-text">{error}</p>}

            <div className="mt-3">
              <Button
                btnText={loading3 ? "Saving..." : "Save"}
                onClick={createTenant}
              />
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        size=""
        isOpen={open3}
        toggle={toggle3}
        className="avail-cars"
        style={{ padding: 0 }}
      >
        <ModalBody className="modal-body">
          <div className="menu-div">
            <h6>Edit Tenant</h6>
            <div>
              <input
                type="text"
                className="inputs"
                placeholder="Tenant Full Name"
              />
              <input type="text" className="inputs" placeholder="Phone" />
              <div className="select">
                <select>
                  <option>-select sex-</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="select">
                <select>
                  <option>-select purpose-</option>
                  <option>Commercial</option>
                  <option>Residential</option>
                </select>
              </div>
              <div className="select">
                <select>
                  <option>-select accommodation-</option>
                  <option>Duplex</option>
                  <option>Bungalo</option>
                  <option>Terrace</option>
                  <option>Apartment</option>
                  <option>Detached</option>
                </select>
              </div>
              <div className="select">
                <select>
                  <option>-select bedroom-</option>
                  <option>1 Bedroom</option>
                  <option>2 Bedrooms</option>
                  <option>3 Bedrroms</option>
                  <option>4 Bedrooms</option>
                  <option>5 Bedrooms</option>
                  <option>6 Bedrooms</option>
                  <option>7 Bedrooms</option>
                </select>
              </div>
              <div className="select">
                <select>
                  <option>-select duration-</option>
                  <option>1year</option>
                  <option>2years</option>
                  <option>3years</option>
                  <option>4years</option>
                  <option>5years</option>
                </select>
              </div>
              <input type="number" className="inputs" placeholder="Rent" />
              <input type="date" className="inputs" placeholder="" />
            </div>
            <div className="mt-3">
              <Button btnText={"Save"} onClick={toggle2} />
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        size=""
        isOpen={open3}
        toggle={toggle3}
        className="avail-cars"
        style={{ padding: 0 }}
      >
        <ModalBody className="modal-body">
          <div className="menu-div">
            <h6>Edit Tenant</h6>
            <div>
              <input
                type="text"
                className="inputs"
                placeholder="Tenant Full Name"
              />
              <input type="text" className="inputs" placeholder="Phone" />
              <div className="select">
                <select>
                  <option>-select sex-</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="select">
                <select>
                  <option>-select purpose-</option>
                  <option>Commercial</option>
                  <option>Residential</option>
                </select>
              </div>
              <div className="select">
                <select>
                  <option>-select accommodation-</option>
                  <option>Duplex</option>
                  <option>Bungalo</option>
                  <option>Terrace</option>
                  <option>Apartment</option>
                  <option>Detached</option>
                  <option>Tenament</option>
                </select>
              </div>
              <div className="select">
                <select>
                  <option>-select bedroom-</option>
                  <option>1 Bedroom</option>
                  <option>2 Bedrooms</option>
                  <option>3 Bedrroms</option>
                  <option>4 Bedrooms</option>
                  <option>5 Bedrooms</option>
                  <option>6 Bedrooms</option>
                  <option>7 Bedrooms</option>
                </select>
              </div>
              <div className="select">
                <select>
                  <option>-select duration-</option>
                  <option>1year</option>
                  <option>2years</option>
                  <option>3years</option>
                  <option>4years</option>
                  <option>5years</option>
                </select>
              </div>
              <input type="number" className="inputs" placeholder="Rent" />
              <input type="date" className="inputs" placeholder="" />
            </div>
            <div className="mt-3">
              <Button btnText={"Save"} onClick={toggle2} />
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
