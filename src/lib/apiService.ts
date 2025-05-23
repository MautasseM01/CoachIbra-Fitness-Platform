import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Updated to use HTTP and correct host
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSampleData = async () => {
  try {
    const response = await apiClient.get('/sample');
    return response.data;
  } catch (error) {
    console.error('Error fetching sample data:', error);
    throw error;
  }
};

export const fetchHomeData = async () => {
  try {
    const response = await apiClient.get('/home');
    return response.data;
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};

export default apiClient;
