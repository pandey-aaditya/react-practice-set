import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Debouncing = () => {
  const [search, setSearch] = useState("");
  const debouncedRef = useRef(null);
  const DEBOUNCE_DELAY = 500;
  const navigate = useNavigate();

  useEffect(() => {
    debouncedRef.current = useDebounce((value) => {
      console.log("Debounced API call:", value);
    }, DEBOUNCE_DELAY);

    return () => {
      debouncedRef.current = null;
    };
  }, []);

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (debouncedRef.current) debouncedRef.current(value);
  };

  const handleNavigateToPolling = () => navigate("/polling");

  return (
    <div className="element-section">
      <button onClick={handleNavigateToPolling}>Navigate to polling</button>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChangeSearch}
      />
    </div>
  );
};

export default Debouncing;
