// Import necessary modules and dependencies
import React, { useState } from "react"; // React library and useState hook for state management
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling
import apiClient from "../utils/apiClient"; // Custom API client for server requests
import { useNavigate } from "react-router-dom"; // Navigation hook from React Router

// Define the EmployeeRegistration component
const EmployeeRegistration = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate to different routes

  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: "", // Employee full name
    qualification: "", // Employee qualification
    joiningDate: "", // Employee joining date
    designation: "", // Employee designation
    salary: "", // Employee salary
    address: "", // Employee address
  });

  // State to manage success or error messages
  const [message, setMessage] = useState("");

  // Function to handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target; // Extract name and value from the event target
    setFormData({ ...formData, [name]: value }); // Update the corresponding field in formData
  };

  // Function to handle the registration process
  const handleRegister = async () => {
    try {
      // Send a POST request to the server with form data
      const response = await apiClient.post("/emp/save", formData);

      // Update the success message
      setMessage("Employee registered successfully!");

      // Log the server response for debugging
      console.log("Response:", response.data);

      // Reset the form fields
      setFormData({
        fullName: "",
        qualification: "",
        joiningDate: "",
        designation: "",
        salary: "",
        address: "",
      });

      // Redirect to the dashboard after 1 second
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      // Handle errors and update the error message
      setMessage("Failed to register employee: " + error.message);

      // Log the error for debugging
      console.error("Error:", error);
    }
  };

  // Return JSX to render the registration form
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      {/* Card container for the registration form */}
      <div className="card shadow-lg p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <h2 className="text-center text-primary mb-4">Employee Registration</h2>
        <form>
          {/* Input field for full name */}
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label fw-semibold">
              Full Name
            </label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

          {/* Input field for qualification */}
          <div className="mb-3">
            <label htmlFor="qualification" className="form-label fw-semibold">
              Qualification
            </label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Enter qualification"
            />
          </div>

          {/* Input field for joining date */}
          <div className="mb-3">
            <label htmlFor="joiningDate" className="form-label fw-semibold">
              Joining Date
            </label>
            <input
              type="date"
              className="form-control rounded-pill"
              id="joiningDate"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
            />
          </div>

          {/* Input field for designation */}
          <div className="mb-3">
            <label htmlFor="designation" className="form-label fw-semibold">
              Designation
            </label>
            <input
              type="text"
              className="form-control rounded-pill"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter designation"
            />
          </div>

          {/* Input field for salary */}
          <div className="mb-3">
            <label htmlFor="salary" className="form-label fw-semibold">
              Salary
            </label>
            <input
              type="number"
              className="form-control rounded-pill"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Enter salary"
            />
          </div>

          {/* Input field for address */}
          <div className="mb-3">
            <label htmlFor="address" className="form-label fw-semibold">
              Address
            </label>
            <textarea
              className="form-control rounded-3"
              id="address"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
            ></textarea>
          </div>

          {/* Register button */}
          <button
            type="button"
            className="btn btn-primary w-100 rounded-pill"
            onClick={handleRegister}
          >
            Register
          </button>

          {/* Display success or error message */}
          {message && (
            <p
              className="text-center mt-3 fw-bold"
              style={{ color: message.includes("successfully") ? "green" : "red" }}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

// Export the EmployeeRegistration component as the default export
export default EmployeeRegistration;
