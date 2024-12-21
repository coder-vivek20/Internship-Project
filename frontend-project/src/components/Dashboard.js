import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigateToUsers = () => {
    navigate("/Register-Page");
  };

  const handleNavigateToEmployees = () => {
    navigate("/employee-register");
  };

  const handleViewUsers = () => {
    navigate("/view-users");
  };

  const handleViewEmployees = () => {
    navigate("/view-employee");
  };

  const handleLogout = () => {
    // Logic for logout can be added here
    navigate("/");
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Dashboard</h1>
        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Add Users Data</h5>
              <p className="card-text">
                Manage and add information for users in the system.
              </p>
              <button
                className="btn btn-primary w-100"
                onClick={handleNavigateToUsers}
              >
                Add Users Data
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Add Employee Data</h5>
              <p className="card-text">
                Manage and add employee details efficiently.
              </p>
              <button
                className="btn btn-primary w-100"
                onClick={handleNavigateToEmployees}
              >
                Add Employee Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">View Users Data</h5>
              <p className="card-text">
                View and manage existing users in the system.
              </p>
              <button
                className="btn btn-secondary w-100"
                onClick={handleViewUsers}
              >
                View Users Data
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">View Employee Data</h5>
              <p className="card-text">
                View and manage existing employee records.
              </p>
              <button
                className="btn btn-secondary w-100"
                onClick={handleViewEmployees}
              >
                View Employee Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card text-white bg-info mb-3">
            <div className="card-header">Statistics</div>
            <div className="card-body">
              <h5 className="card-title">User Count</h5>
              <p className="card-text">
                Manage a growing number of users with ease.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Statistics</div>
            <div className="card-body">
              <h5 className="card-title">Employee Count</h5>
              <p className="card-text">
                Track all employee details in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
