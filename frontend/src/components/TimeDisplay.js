import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import { timeFormat } from "../util";

const TimeDisplay = () => {
  // a string holding the current date and time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="container ms-4 p-2">
      <Grid rows={[["Current Time", timeFormat(currentTime)]]} />
    </div>
  );
};

export default TimeDisplay;
