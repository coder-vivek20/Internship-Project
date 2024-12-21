export const authRequest = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found in localStorage');
    }

    const defaultOptions = {
        headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData}`);
    }

    return response.json();
};
