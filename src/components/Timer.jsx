import React, { useEffect, useState } from "react";

const Timer = ({ time, setTimer }) => {
  const [hrs, mins, secs] = time;
  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) {
      reset();
    } else if (mins === 0 && secs === 0) {
      setTimer([hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTimer([hrs, mins - 1, 59]);
    } else {
      setTimer([hrs, mins, secs - 1]);
    }
  };

  const reset = () => setTimer([parseInt(0), parseInt(0), parseInt(0)]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });
  return (
    <div>
      <p>{`${hrs.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`}</p>
    </div>
  );
};

export default Timer;
