import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext({
  sensorData: {},
  fetchSensorData: () => {}
});

export const AuthContextProvider = (props) => {
  const [sensorData, setSensorData] = useState([]);
  const [error, setError] = useState(null);

  const fetchSensorData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/pointclim");
      setSensorData(response.data);
    } catch (err) {
      setError("Error fetching data:", err.message);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchSensorData();

    // Set up polling
    const intervalId = setInterval(() => {
      fetchSensorData();
    }, 20000); // Poll every 2 second

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ sensorData, fetchSensorData }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
