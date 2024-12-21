import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../utils/apiClient";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    fullName: "",
    qualification: "",
    joiningDate: "",
    designation: "",
    salary: "",
    address: "",
    gender: "", // Added gender field
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await apiClient.get(`/emp/${id}`); // Endpoint to fetch employee by ID
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`/emp/update/${id}`, employee); 
      alert("Employee updated successfully!");
      navigate("/view-employee"); 
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="container mt-5 border border">
      <h2 className="text-center">Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={employee.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Qualification</label>
          <input
            type="text"
            className="form-control"
            name="qualification"
            value={employee.qualification}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Joining Date</label>
          <input
            type="date"
            className="form-control"
            name="joiningDate"
            value={employee.joiningDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Designation</label>
          <input
            type="text"
            className="form-control"
            name="designation"
            value={employee.designation}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="number"
            className="form-control"
            name="salary"
            value={employee.salary}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            name="address"
            value={employee.address}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-control"
            name="gender"
            value={employee.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
