// Importing necessary modules and hooks
import React, { useState } from 'react'; // React and the useState hook for managing state
import { useNavigate } from 'react-router-dom'; // useNavigate for programmatic navigation

function LoginForm() {
    // State to store form input values: username and password
    const [formData, setFormData] = useState({ name: '', password: '' });
    // State to store and display any error messages
    const [error, setError] = useState('');
    // Hook to navigate between routes
    const navigate = useNavigate();

    // Function to handle changes in form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target; // Extracting name and value of the input field
        setFormData({ ...formData, [name]: value }); // Dynamically updating the corresponding field in formData
        setError(''); // Resetting error message when user starts typing
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        try {
            // Sending a POST request to the login endpoint with form data
            const response = await fetch('http://localhost:8080/login/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Indicating that we're sending JSON data
                },
                body: JSON.stringify(formData), // Converting formData object to JSON
            });

            // Handling successful login
            if (response.ok) {
                const token = await response.text(); // Extract the authentication token from the response
                localStorage.setItem('token', token); // Save the token in local storage for future use
                console.log('Token saved:', token);

                fetchWithAuth(); // Fetch additional protected data after successful login

                alert('Login successful'); // Notify the user of successful login
                navigate('/Dashboard'); // Redirect the user to the Dashboard page
            } else {
                // Handling different error cases based on response status
                const errorMessage = response.status === 403
                    ? 'Access forbidden. Check your credentials or permissions.'
                    : response.status === 404
                    ? 'Login endpoint not found. Please contact support.'
                    : await response.text(); // Fallback error message from server
                setError(errorMessage || 'Invalid username or password'); // Set appropriate error message
            }
        } catch (error) {
            // Handling network or other unexpected errors
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    // Function to fetch protected data using the authentication token
    const fetchWithAuth = async () => {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        if (token) {
            try {
                // Sending a GET request to a protected endpoint with the token
                const response = await fetch(`http://localhost:8080/users/`, {
                    method: 'GET',
                    headers: {
                        Authorization: `${token}`, // Adding the token to the Authorization header
                        'Content-Type': 'application/json',
                    },
                });

                // Handling successful data fetch
                if (response.ok) {
                    const data = await response.json(); // Parse JSON data from the response
                    console.log('Fetched protected data:', data);
                } else if (response.status === 403) {
                    // Token is invalid or expired
                    console.error('Error: Forbidden (403).');
                    setError('Access forbidden. Please log in again.');
                    localStorage.removeItem('token'); // Clear invalid token
                } else if (response.status === 404) {
                    // Protected resource not found
                    console.error('Error: Resource not found (404).');
                    setError('Resource not found. Check the API endpoint.');
                } else {
                    console.error('Unexpected error:', response.status);
                }
            } catch (error) {
                // Handling errors during the fetch operation
                console.error('Error in fetchWithAuth:', error.message);
            }
        } else {
            console.warn('No token found in localStorage. Skipping authorization header.');
        }
    };

    // JSX to render the login form and handle user interaction
    return (
        <div>
            <main className="flex-grow-1 d-flex justify-content-center align-items-center py-4">
                <div className="container">
                    <div
                        className="card shadow rounded p-5"
                        style={{
                            maxWidth: '400px',
                            margin: '0 auto',
                            border: '1px solid #ccc',
                            backgroundColor: '#fff',
                        }}
                    >
                        {/* Form title */}
                        <h2 className="text-center mb-4">Login Form</h2>
                        <hr />
                        {/* Login form */}
                        <form onSubmit={handleSubmit}>
                            {/* Username input field */}
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label fw-bold">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="name" // This links to formData.name
                                    className="form-control"
                                    value={formData.name} // Controlled component
                                    onChange={handleInputChange} // Update state on input
                                    required
                                    autoComplete="username"
                                />
                            </div>
                            {/* Password input field */}
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-bold">
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password" // This links to formData.password
                                    className="form-control"
                                    value={formData.password} // Controlled component
                                    onChange={handleInputChange} // Update state on input
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                            {/* Error message */}
                            {error && <div className="alert alert-danger">{error}</div>}
                            {/* Submit button */}
                            <button type="submit" className="btn btn-primary w-100" name="submit">
                                Login
                            </button>
                        </form>
                        {/* Registration link */}
                        <div className="text-center mt-3">
                            <p>
                                Don't have an account?{' '}
                                <a href="Register-user" className="text-primary text-decoration-none">
                                    Register here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default LoginForm; // Exporting the component for use in other parts of the application
