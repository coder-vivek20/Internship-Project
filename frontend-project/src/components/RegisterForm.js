import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(''); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

     
        if (formData.password.length < 5) {
            setError('Password must be at least 5 characters long.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match. Please try again.');
            return;
        }

        try {
            
            const response = await fetch('http://localhost:8080/login/loginsave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });

            if (response.ok) {
                alert('Registration successful!');
                
                setFormData({ name: '', email: '', password: '', confirmPassword: '' }); // Reset form
                navigate('/');
            } else {
                alert('Registration failed. Please try again.');
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="container d-flex flex-grow-1 justify-content-center align-items-center py-4">
                <div className="card shadow rounded p-5" style={{ maxWidth: '400px', width: '100%', border: '1px solid #ccc' }}>
                    <h2 className="text-center mb-4">Registration Form</h2>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-bold">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-bold">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-bold">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label fw-bold">Confirm Password:</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="form-control"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default RegisterForm;
