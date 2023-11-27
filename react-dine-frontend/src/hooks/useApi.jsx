import { useState, useCallback } from "react";
import axios from "axios";

// Get the API base URL from .env
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const useApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDishes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/dishes`);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const postOrder = useCallback(async (newOrder) => {
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/orders`, newOrder);
      console.log(response);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, getDishes, postOrder };
};

export default useApi;
