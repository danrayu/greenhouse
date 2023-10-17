import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./store/auth-context";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "./components/Card";
import Dashboard from "./components/Dashboard";
import ReadingsDisplay from "./components/ReadingsDisplay";
import TimeDisplay from "./components/TimeDisplay";
import LoadingComponent from "./components/LoadingComponent";

function splitBySensorId(sensorDataArray) {
  const temp = {};

  for (let data of sensorDataArray) {
    const sensorId = data.sensor_id;

    if (!temp[sensorId]) {
      temp[sensorId] = [];
    }

    temp[sensorId].push({
      temperature: data.temperature,
      light: data.light,
      humidity: data.humidity,
      timestamp: data.timestamp,
    });
  }

  const result = [];
  for (let id in temp) {
    result.push({
      sensor_id: id,
      data: temp[id],
    });
  }

  return result;
}

const App = () => {
  const context = useContext(AuthContext);

  const [readings, setSensorReadings] = useState(context.sensorData);

  useEffect(() => {
    setSensorReadings([...context.sensorData]);
  }, [context.sensorData]);

  // make requests to backend while there is no data
  useEffect(() => {
    if (!readings.length) {
      const intervalId = setInterval(() => {
        context.fetchSensorData();
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [readings]);

  const displayApp = () => {
    return (
      <div>
        <Card className="container-md">
          <div className="d-flex">
            <div className="col-9">
              <h2 className="ms-4 p-2">Everlast Agro Dash</h2>
            </div>
            <div className="col-3">
              <TimeDisplay />
            </div>
          </div>
        </Card>
        <div className="d-flex">
          <div className="container-md col-9">
            {splitBySensorId(readings).map((sensorReadings, i) => {
              return (
                <Card key={i} className="h-80 w-100">
                  <Dashboard
                    data={sensorReadings.data}
                    sensorName={sensorReadings.sensor_id}
                  />
                </Card>
              );
            })}
          </div>
          <ReadingsDisplay data={readings} />
        </div>
      </div>
    );
  };

  const waitForData = () => {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  };

  return (
    <>
      {readings.length && displayApp()}
      {!readings.length && waitForData()}
    </>
  );
};

export default App;
