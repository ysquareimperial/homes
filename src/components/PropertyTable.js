import React from "react";
import { AiOutlineMenu } from "react-icons/ai";

export default function PropertyTable({ properties, toggle1 }) {
  return (
    <div className="table-container">
      <table className="table-fixed">
        <thead>
          <tr>
            {/* <th>S/N</th> */}
            <th>Name</th>
            <th>Address</th>
            <th>Tenants</th>
            <th>Blocks</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property, index) => (
            <tr key={index}>
              {/* <td>{index + 1}</td> */}
              <td>{property.name}</td>
              <td>{property.address}</td>
              <td>{property.tenant_count}</td>
              <td>{property.block_count}</td>
              <td>
                <AiOutlineMenu
                  className="menu"
                  size="1.5em"
                  onClick={toggle1}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
