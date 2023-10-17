import React from "react";
import Grid from "./Grid";
import Card from "./Card";
import { timeFormat } from '../util';

const ReadingsDisplay = (props) => {
  let sensorReadings = [...props.data].reverse();

  return (
    <div className="container-md col-3">
      {sensorReadings.map((reading) => {
        let time = new Date(Math.floor(reading["timestamp"]));

        time = timeFormat(time);

        return (
          <Card key={reading["timestamp"]} className="">
            <Grid
              rows={[
                ["Temperature", reading["temperature"]],
                ["Humidity", reading["humidity"]],
                ["Brightness", Math.floor(reading["light"])],
                ["Sensor", reading["sensor_id"]],
                ["Time", time],
              ]}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default ReadingsDisplay;
