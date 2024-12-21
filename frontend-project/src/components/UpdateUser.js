import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../utils/apiClient';

const UpdateUser = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        currentAddress: '',
        permanentAddress: '',
        educationYear: '',
        gender: '',
        countryId: '',
        stateId: '',
        cityId: '',
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apiClient.get(`/users/${id}`);
                const user = response.data;

                setUserData({
                    firstName: user.firstName || '',
                    lastName: user.lastName || '',
                    currentAddress: user.currentAddress || '',
                    permanentAddress: user.permanentAddress || '',
                    educationYear: user.educationYear || '',
                    gender: user.gender || '',
                    countryId: user.country?.id || '',
                    stateId: user.state?.id || '',
                    cityId: user.city?.id || '',
                });

                if (user.country?.id) {
                    const statesResponse = await apiClient.get(`/users/State/${user.country.id}`);
                    setStates(statesResponse.data);

                    if (user.state?.id) {
                        const citiesResponse = await apiClient.get(`/users/City/${user.state.id}`);
                        setCities(citiesResponse.data);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                alert('Failed to fetch user data. Please try again later.');
            }
        };

        const fetchCountries = async () => {
            try {
                const response = await apiClient.get('/users/countries/');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchUserData();
        fetchCountries();
    }, [id]);

    const handleLocationChange = async (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
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

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('firstName', userData.firstName);
        formData.append('lastName', userData.lastName);
        formData.append('currentAddress', userData.currentAddress);
        formData.append('permanentAddress', userData.permanentAddress);
        formData.append('educationYear', userData.educationYear);
        formData.append('gender', userData.gender);
        formData.append('countryId', userData.countryId);
        formData.append('stateId', userData.stateId);
        formData.append('cityId', userData.cityId);

        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        try {
            await apiClient.put(`/users/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('User updated successfully!');
            navigate('/view-users');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user. Please try again.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card shadow-lg border-0">
                <div className="card-header bg-primary text-white text-center">
                    <h3>Update User</h3>
                </div>
                <div className="card-body py-4 px-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="form-control"
                                value={userData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="form-control"
                                value={userData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="currentAddress">Current Address</label>
                            <input
                                type="text"
                                id="currentAddress"
                                name="currentAddress"
                                className="form-control"
                                value={userData.currentAddress}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="permanentAddress">Permanent Address</label>
                            <input
                                type="text"
                                id="permanentAddress"
                                name="permanentAddress"
                                className="form-control"
                                value={userData.permanentAddress}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="educationYear">Education Year</label>
                            <input
                                type="text"
                                id="educationYear"
                                name="educationYear"
                                className="form-control"
                                value={userData.educationYear}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                className="form-control"
                                value={userData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="countryId">Country</label>
                            <select
                                id="countryId"
                                name="countryId"
                                className="form-control"
                                value={userData.countryId}
                                onChange={handleLocationChange}
                                required
                            >
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="stateId">State</label>
                            <select
                                id="stateId"
                                name="stateId"
                                className="form-control"
                                value={userData.stateId}
                                onChange={handleLocationChange}
                                required
                            >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state.id} value={state.id}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="cityId">City</label>
                            <select
                                id="cityId"
                                name="cityId"
                                className="form-control"
                                value={userData.cityId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.id}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="image">Profile Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="form-control"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                                Update User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
