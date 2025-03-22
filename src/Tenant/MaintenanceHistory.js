import React, { useState } from "react";

const maintenanceHistoryData = [
  {
    id: 1,
    tenant: "Habu Yakasai",
    phone: "+234 090 3334 434",
    category: "Plumbing",
    details: "Leaking pipe in the kitchen, needs urgent fixing.",
    priority: "High",
    status: "Treated",
  },
  {
    id: 2,
    tenant: "Amina Bello",
    phone: "+234 081 5678 123",
    category: "Electrical",
    details: "Frequent power tripping in the apartment.",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 3,
    tenant: "John Doe",
    phone: "+234 080 9876 654",
    category: "Carpentry",
    details: "Broken door frame in the living room.",
    priority: "Low",
    status: "Canceled",
  },
  {
    id: 4,
    tenant: "Fatima Suleiman",
    phone: "+234 070 4567 890",
    category: "HVAC",
    details: "Air conditioner not cooling properly.",
    priority: "High",
    status: "Pending",
  },
];

const MaintenanceHistory = () => {
  const [showMore, setShowMore] = useState({});

  const toggleShowMore = (id) => {
    setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="outlet_">
      <h3 className="mt-4">Maintenance History</h3>
      <div className="mt-3">
        {maintenanceHistoryData.map((item) => (
          <div key={item.id} className="card p-3 mb-3">
            <h5>{item.tenant}</h5>
            <p>
              <strong>Phone:</strong> {item.phone}
            </p>
            <p>
              <strong>Category:</strong> {item.category}
            </p>
            <p>
              <strong>Details:</strong>{" "}
              {showMore[item.id]
                ? item.details
                : `${item.details.substring(0, 30)}...`}
              {item.details.length > 30 && (
                <span
                  onClick={() => toggleShowMore(item.id)}
                  className="text-primary underline"
                >
                  {" "}
                  {showMore[item.id] ? "Less" : "More"}
                </span>
              )}
            </p>
            <p>
              <strong>Priority:</strong> {item.priority}
            </p>
            <p
              className={
                item.status === "Treated"
                  ? "text-success"
                  : item.status === "Pending"
                  ? "text-warning"
                  : "text-danger"
              }
            >
              <strong>Status:</strong> {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceHistory;
