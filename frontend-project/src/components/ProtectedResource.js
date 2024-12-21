import React, { useEffect, useState } from 'react';
import { authRequest } from '../utils/authRequest';

function ProtectedResource() {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await authRequest('http://localhost:8080/users'); 
                setData(result); 
            } catch (err) {
                console.error('Error fetching protected resource:', err.message);
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Protected Resource</h2>
            {error && <p className="text-danger">Error: {error}</p>}
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre> 
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ProtectedResource;
