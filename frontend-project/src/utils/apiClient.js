import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});


apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers['Authorization'] = token; 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

  
 
 
  
export default apiClient;
