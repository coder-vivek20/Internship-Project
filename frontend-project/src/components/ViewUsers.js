import React, { useEffect, useState } from 'react';
import apiClient from '../utils/apiClient';
 // Import the configured Axios instance
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

const ViewUsers = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get('/users/');
                setUsers(response.data);
                console.log('Data fetched from database:', response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                alert('Failed to fetch user data. Please try again later.');
            }
        };
    
        fetchData();
    }, []);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleGoBack = () => {
        navigate('/dashboard');
    };

    const handleDelete = async (id) => {
        try {
            await apiClient.delete(`/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
            alert('User deleted successfully!');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user. Please try again later.');
        }
    };

    const handleUpdate = (id) => {
        alert(`Update button clicked for user ID: ${id}`);
        navigate(`/update-user/${id}`);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>User Data</h2>
                <button 
                    className="btn btn-danger m-2 p-2" 
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <button 
                className="btn btn-primary mb-4 p-2" 
                onClick={handleGoBack}
            >
                go to Dashboard..
            </button>

            <div className="row">
                {users.map((user) => (
                    <div className="col-md-4 mb-4" key={user.id}>
                        <div className="card">
                            <div className="card-body">
                                {user.image && (
                                    <img
                                        src={`data:image/jpeg;base64,${user.image}`}
                                        alt={`${user.firstName} ${user.lastName}`}
                                        className="card-img-top"
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                )}
                                <h5 className="card-title mt-2">
                                    {user.firstName} {user.lastName}
                                </h5>
                                <p className="card-text">
                                    <strong>Current Address:</strong> {user.currentAddress}<br />
                                    <strong>Permanent Address:</strong> {user.permanentAddress}<br />
                                    <strong>Education Year:</strong> {user.educationYear}<br />
                                    <strong>Gender:</strong> {user.gender}<br />
                                    <strong>Country:</strong> {user.country ? user.country.name : 'N/A'}<br />
                                    <strong>State:</strong> {user.state ? user.state.name : 'N/A'}<br />
                                    <strong>City:</strong> {user.city ? user.city.name : 'N/A'}
                                </p>
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleUpdate(user.id)}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewUsers;
