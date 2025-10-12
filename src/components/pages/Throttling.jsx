import { useEffect, useRef, useState } from "react";
import { useThrottle } from "../../hooks";

const Throttling = () => {
  const [search, setSearch] = useState("");
  const throttleRef = useRef(null);
  const THROTTLE_DELAY = 500;

  useEffect(() => {
    throttleRef.current = useThrottle((value) => {
      console.log("Throttled API call:", value);
    }, THROTTLE_DELAY);

    return () => {
      throttleRef.current = null;
    };
  }, []);

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (throttleRef.current) throttleRef.current(value);
  };

  return (
    <div className="element-section">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChangeSearch}
      />
    </div>
  );
};

export default Throttling;
