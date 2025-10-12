import { useEffect, useState } from "react";

const durations = {
  red: {
    label: "red",
    time: 5000,
  },
  yellow: {
    label: "yellow",
    time: 2000,
  },
  green: {
    label: "green",
    time: 3000,
  },
};

const TrafficLight = () => {
  const [active, setActive] = useState(durations.red.label);
  const [remaining, setRemaining] = useState(durations.red.time);

  useEffect(() => {
    let timer;

    setRemaining(durations[active].time);

    timer = setTimeout(() => {
      switch (active) {
        case durations.red.label:
          setActive(durations.yellow.label);
          break;
        case durations.yellow.label:
          setActive(durations.green.label);
          break;
        case durations.green.label:
          setActive(durations.red.label);
          break;
        default:
          break;
      }
    }, durations[active].time);

    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1000 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  console.log(`Active: ${active}, Remaining: ${remaining / 1000}s`);

  return (
    <div className="traffic-light-container-xl">
      <div className="traffic-light-container">
        <div
          className={`light red ${active === durations.red.label ? "on" : ""}`}
        >
          {active === durations.red.label && remaining / 1000}
        </div>

        <div
          className={`light yellow ${
            active === durations.yellow.label ? "on" : ""
          }`}
        >
          {active === durations.yellow.label && remaining / 1000}
        </div>

        <div
          className={`light green ${
            active === durations.green.label ? "on" : ""
          }`}
        >
          {active === durations.green.label && remaining / 1000}
        </div>
      </div>
    </div>
  );
};

export default TrafficLight;
