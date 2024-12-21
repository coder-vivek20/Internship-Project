import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [editableEmployee, setEditableEmployee] = useState(null);
  const [updatedValue, setUpdatedValue] = useState("");

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await apiClient.get("/emp/all");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredEmployees = employees.filter((employee) =>
    employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const records = filteredEmployees.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredEmployees.length / recordsPerPage);
  const visiblePages = 3; // Number of page buttons to display at a time
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(npage, startPage + visiblePages - 1);
  const numbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
  let pid = firstIndex + 1;

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await apiClient.delete(`/emp/delete/${id}`);
        setEmployees(employees.filter((employee) => employee.id !== id));
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const handleRecordsPerPageChange = (event) => {
    const value = parseInt(event.target.value, 10);
    const newCurrentPage = Math.ceil(firstIndex / value) + 1;
    setRecordsPerPage(value);
    setCurrentPage(newCurrentPage);
  };

  const handleEditClick = (employeeId, fieldName, currentValue) => {
    setEditableEmployee({ id: employeeId, field: fieldName });
    setUpdatedValue(currentValue);
  };

  const handleSave = async (employeeId, fieldName) => {
    try {
      const updatedEmployee = { ...employees.find((emp) => emp.id === employeeId), [fieldName]: updatedValue };
      await apiClient.put(`/emp/update/${employeeId}`, updatedEmployee);
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === employeeId ? { ...employee, [fieldName]: updatedValue } : employee
        )
      );
      alert("Employee updated successfully!");
    } catch (error) {
      console.error("Error updating field:", error);
      alert("Failed to update employee. Please try again.");
    } finally {
      setEditableEmployee(null);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Employee Details</h2>

      <div className="mb-4 d-flex justify-content-between align-items-center">
        <div className="col-md-5">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search employees by name, designation, or address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="recordsPerPage" className="form-label me-2">
            Records Per Page:
          </label>
          <select
            id="recordsPerPage"
            className="form-select"
            value={recordsPerPage}
            onChange={handleRecordsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Qualification</th>
              <th>Joining Date</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Address</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((employee) => (
                <tr key={employee.id}>
                  <td>{pid++}</td>
                  {["fullName", "qualification", "joiningDate", "designation", "salary", "address"].map((field) => (
                    <td key={field}>
                      {editableEmployee?.id === employee.id && editableEmployee?.field === field ? (
                        <div className="d-flex align-items-center">
                          <input
                            type={field === "joiningDate" ? "date" : "text"}
                            value={updatedValue}
                            className="form-control me-2"
                            onChange={(e) => setUpdatedValue(e.target.value)}
                            autoFocus
                          />
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleSave(employee.id, field)}
                          >
                            <i className="bi bi-check"></i>
                          </button>
                        </div>
                      ) : (
                        <span
                          onClick={() => handleEditClick(employee.id, field, employee[field])}
                          style={{ cursor: "pointer" }}
                        >
                          {employee[field]}
                        </span>
                      )}
                    </td>
                  ))}
                  <td>
                    {editableEmployee?.id === employee.id && editableEmployee?.field === "gender" ? (
                      <div className="d-flex align-items-center">
                        <select
                          value={updatedValue}
                          onChange={(e) => setUpdatedValue(e.target.value)}
                          className="form-select me-2"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleSave(employee.id, "gender")}
                        >
                          <i className="bi bi-check"></i>
                        </button>
                      </div>
                    ) : (
                      <span
                        onClick={() => handleEditClick(employee.id, "gender", employee.gender)}
                        style={{ cursor: "pointer" }}
                      >
                        {employee.gender}
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex justify-content-start">
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleUpdate(employee.id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(employee.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <nav className="d-flex justify-content-end mt-3">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => changePage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {numbers.map((num) => (
            <li
              key={num}
              className={`page-item ${currentPage === num ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => changePage(num)}>
                {num}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === npage ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => changePage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default EmployeeTable;
