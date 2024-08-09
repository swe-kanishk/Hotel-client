// utils/auth.js
import axios from 'axios';

export const verifyToken = async (token) => {

  const airbnb_api = import.meta.env.VITE_API_URL
  console.log(airbnb_api)
  try {
    const response = await axios.post(
      `${airbnb_api}/api/auth/verify-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
};
