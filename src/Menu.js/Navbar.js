import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "reactstrap";
import logo from "../Images/HomesLogo.jpg";
import user from "../Images/profile.jpg";
import Drawer from "react-modern-drawer";
import { useEffect } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import "react-modern-drawer/dist/index.css";
import { CgProfile } from "react-icons/cg";
import { MdMapsHomeWork } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineHome } from "react-icons/ai";
import { GrHostMaintenance } from "react-icons/gr";
import { TbReportMoney } from "react-icons/tb";
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="">
      <div>
        <div className="mobile_navbar d-flex justify-content-between p-2">
          <div>
            <HiOutlineMenuAlt2
              size={25}
              className="drawer"
              onClick={toggleDrawer}
            />
          </div>
          <div>
            <h5>Homes</h5>
          </div>
          <div>
            <CgProfile size={25} />
          </div>
        </div>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="left"
          className=""
        >
          <>
            {location.pathname.includes("operator/") ? null : (
              <div className="mt-4">
                {/* <p className={`sidebar-i ${location.pathname === "/pending-tasks" && "active_sidebar" }`} onClick={() => navigate('/pending-tasks')}><i class="fa-solid fa-list-check"></i>{' '}My Tasks</p> */}
                <p
                  className={`list ${
                    location.pathname === "/admin/home" && "active_listss"
                  }`}
                  onClick={() => {
                    navigate("/admin/home");
                    toggleDrawer();
                  }}
                >
                  <AiOutlineDashboard size="1.5em" /> Dashboard
                </p>
                {/* <p
                      className={`list ${
                        location.pathname === "/admin/operators" && "active_listss"
                      }`}
                      onClick={() => navigate("/admin/operators")}
                    >
                      <FaUsers size="1.5em" /> Operators
                    </p> */}
                <p
                  className={`list ${
                    location.pathname === "/admin/PM" && "active_listss"
                  }`}
                  onClick={() => {
                    navigate("/admin/PM");
                    toggleDrawer();
                  }}
                >
                  <AiOutlineHome size="1.5em" /> Properties
                </p>

                <p
                  className={`list ${
                    location.pathname === "/admin/view-maintenance" &&
                    "active_listss"
                  }`}
                  onClick={() => {
                    navigate("/admin/view-maintenance");
                    toggleDrawer();
                  }}
                >
                  <GrHostMaintenance size="1.5em" /> Maintenance
                </p>
                <p
                  className={`list ${
                    location.pathname === "/admin/view-payments" &&
                    "active_listss"
                  }`}
                  onClick={() => {
                    navigate("/admin/view-payments");
                    toggleDrawer();
                  }}
                >
                  <TbReportMoney size="1.5em" /> Payments
                </p>
              </div>
            )}
            {location.pathname.includes("admin") ? null : (
              <div className="mt-4">
                {/* <p className={`sidebar-i ${location.pathname === "/pending-tasks" && "active_sidebar" }`} onClick={() => navigate('/pending-tasks')}><i class="fa-solid fa-list-check"></i>{' '}My Tasks</p> */}
                <p
                  className={`list ${
                    location.pathname === "/operator/home" && "active_listss"
                  }`}
                  onClick={() => navigate("/operator/home")}
                >
                  <MdDashboard size="1.5em" /> Dashboard
                </p>
                <p
                  className={`list ${
                    location.pathname === "/operator/PM" && "active_listss"
                  }`}
                  onClick={() => navigate("/operator/PM")}
                >
                  <MdMapsHomeWork size="1.5em" /> PM
                </p>
              </div>
            )}
          </>
        </Drawer>
      </div>
    </div>
  );
}
