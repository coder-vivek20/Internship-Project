import React from 'react';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewUsers from './components/ViewUsers'; 
import UpdateUser from './components/UpdateUser';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProtectedResource from './components/ProtectedResource';
import EmployeeRegistration from './components/EmployeeRegistration';
import Dashboard from './components/Dashboard';
import EmployeeTable from './components/EmployeeTable';
import UpdateEmployee from './components/UpdateEmployee';
function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/Register-Page" element={<Register />} />
                <Route path="/Register-user" element={<RegisterForm />} />
                <Route path="view-users" element={<ViewUsers />} />
                <Route path="/update-user/:id" element={<UpdateUser />} />
                <Route path="/protected" element={<ProtectedResource />} />
                <Route path="/employee-register" element={<EmployeeRegistration />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/view-employee" element={<EmployeeTable />} />
                <Route path="/update/:id" element={<UpdateEmployee />} />
            </Routes>
        </Router>
  );
}

export default App;
