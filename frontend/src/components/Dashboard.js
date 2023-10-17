import React from "react";
import LineChartD from "./LineChartD";
import LineChartDHT from "./LineChartDHT";
import Grid from "./Grid";
import "./Dashboard.css";
import { fixTimeDisplay } from '../util';

const Dashboard = (props) => {
  // graph data arrays
  let dhtData = [];
  let lightData = [];
  // the sums of the sensor reading to be used for getting the average
  let temp_sum = 0.0;
  let humid_sum = 0.0;
  let light_sum = 0.0;

  // cycle through readings
  for (let readingI in props.data) {
    const time = new Date(Math.floor(props.data[readingI]["timestamp"]));
    const hour = time.getHours() + ":" + fixTimeDisplay(time.getMinutes());

    // Rechart compatible dictionaries of the data
    dhtData.push({
      name: hour,
      temp: props.data[readingI]["temperature"],
      humidity: props.data[readingI]["humidity"],
    });
    lightData.push({
      name: hour,
      "light level": Math.floor(props.data[readingI]["light"]),
    });

    // summing for the averages
    temp_sum += parseFloat(props.data[readingI]["temperature"]);
    humid_sum += parseFloat(props.data[readingI]["humidity"]);
    light_sum += parseFloat(props.data[readingI]["light"]);
  }

  // finding the averages and displaying them

  const readings_count = props.data.length;
  const displayAvgs = () => {

    const temp_avg = Math.round((temp_sum * 10) / readings_count) / 10 + "°C";
    const humid_avg = Math.round(humid_sum / readings_count) + "%";
    const light_avg = light_sum / readings_count;

    return (
      <div className="m-4 average-readings">
        <h5 className="container">Averages of readings (last 24h.)</h5>
        <Grid
          rows={[
            ["Temperature", temp_avg],
            ["Humidity", humid_avg],
            ["Light", Math.round(light_avg)],
          ]}
        />
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-center my-2">Dashboard (sensor {props.sensorName})</h2>
      <div className="d-flex flex-wrap mt-5">
        <LineChartDHT data={dhtData} />
        <LineChartD
          data={lightData}
          dataKeyName={"light level"}
          name={"Light levels last 24h."}
          domain={[0, 1150]}
        />
        {readings_count && displayAvgs()}
      </div>
    </div>
  );
};

export default Dashboard;
