import React, { useState } from "react";
import isLoggedIn from "../components/isLoggedIn";

export default function Departments() {
  const [departments, setDepartments] = useState([{ name: "" }]);
  const isUserLoggedIn = isLoggedIn();

  if (!isUserLoggedIn) {
    window.location.href = "/";
    alert("You are not logged in");
    return null;
  }

  const handleAddDepartment = () => {
    setDepartments([...departments, { name: "" }]);
  };

  const handleRemoveDepartment = (index) => {
    if (
      window.confirm(`Are you sure you want to remove department ${index + 1}?`)
    ) {
      const newDepartments = [...departments];
      newDepartments.splice(index, 1);
      setDepartments(newDepartments);
    }
  };

  const handleDepartmentNameChange = (event, index) => {
    const newDepartments = [...departments];
    newDepartments[index].name = event.target.value;
    setDepartments(newDepartments);
  };

  return (
    <div className="container my-4 px-5 py-4 rounded shadow bg-body-tertiary">
      <h2 className="text-center mb-4 col">Departments Page</h2>

      <table className="table table-bordered text-center table-hover">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Sr. No.</th>
            <th>Department Name</th>
            <th style={{ width: "10%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department, index) => (
            <tr key={index}>
              <td style={{ width: "10%" }}>{index + 1}</td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={department.name}
                  onChange={(event) => handleDepartmentNameChange(event, index)}
                />
              </td>
              <td style={{ width: "10%" }}>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveDepartment(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-center">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleAddDepartment}
              >
                Add Row
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
