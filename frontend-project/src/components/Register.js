import React, { useState, useEffect } from 'react';
import '../styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiClient from '../utils/apiClient';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        currentAddress: '',
        educationYear: '',
        gender: '',
        permanentAddress: '',
        countryId: '',
        stateId: '',
        cityId: '',
        image: null,
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await apiClient.get('/users/countries/');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);

    const handleLocationChange = async (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            ...(name === 'countryId' ? { stateId: '', cityId: '' } : {}),
            ...(name === 'stateId' ? { cityId: '' } : {}),
        }));

        try {
            if (name === 'countryId') {
                const statesResponse = await apiClient.get(`/users/State/${value}`);
                setStates(statesResponse.data);
                setCities([]);
            } else if (name === 'stateId') {
                const citiesResponse = await apiClient.get(`/users/City/${value}`);
                setCities(citiesResponse.data);
            }
        } catch (error) {
            console.error(`Error fetching ${name === 'countryId' ? 'states' : 'cities'}:`, error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSubmit.append(key, formData[key]);
        });

        try {
            await apiClient.post('/users/RegisterUser', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Registration successful!');
            navigate('/view-users');
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Registration failed. Please try again.');
        }
    };

    const handleViewData = () => navigate('/view-users');
    const handleBackToDashboard = () => navigate('/dashboard');

    return (
        <div>
            <button
                type="button"
                className="btn btn-secondary mb-3"
                onClick={handleBackToDashboard}
            >
                Back to Dashboard
            </button>
        <div className="form-container">
           
            <h2>Register Form</h2>
            <form onSubmit={handleSubmit}>
                {['firstName', 'lastName', 'currentAddress', 'educationYear', 'permanentAddress'].map((field) => (
                    <div className="form-group form-row" key={field}>
                        <label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1').trim()}</label>
                        <input
                            type="text"
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                ))}

                <div className="form-group form-row">
                    <label>Gender</label>
                    {['male', 'female', 'other'].map((gender) => (
                        <div className="form-check form-check-inline" key={gender}>
                            <input
                                className="form-check-input"
                                type="radio"
                                id={gender}
                                name="gender"
                                value={gender}
                                onChange={handleInputChange}
                                checked={formData.gender === gender}
                            />
                            <label className="form-check-label" htmlFor={gender}>{gender.charAt(0).toUpperCase() + gender.slice(1)}</label>
                        </div>
                    ))}
                </div>

                {[{ label: 'Country', name: 'countryId', options: countries },
                  { label: 'State', name: 'stateId', options: states },
                  { label: 'City', name: 'cityId', options: cities }].map(({ label, name, options }) => (
                    <div className="form-group form-row" key={name}>
                        <label htmlFor={name}>{label}</label>
                        <select
                            id={name}
                            name={name}
                            value={formData[name]}
                            onChange={handleLocationChange}
                            className="form-control"
                            required
                        >
                            <option value="">Select {label}</option>
                            {options.map((option) => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                ))}

                <div className="form-group form-row">
                    <label htmlFor="image">Upload Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        className="form-control-file"
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">Register</button>
                    <button type="button" className="btn btn-primary" onClick={handleViewData}>View Users</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default Register;
