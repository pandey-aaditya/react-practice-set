import { useCallback, useState } from "react";
import { usePipe } from "../../hooks";

const Pipe = () => {
  const [number, setNumber] = useState("");

  const func1 = (x) => x * x;
  const func2 = (x) => 2 * x * x;
  const func3 = (x) => 3 * x * x;

  const processNumber = usePipe(func1, func2, func3);

  const handleChange = (e) => {
    const value = e.target.value;

    if (isNaN(value) || value === "") {
      setNumber("");
      return;
    }

    setNumber(value);
  };

  const handleSubmit = useCallback(() => {
    const num = Number(number);
    const finalValue = processNumber(num);
    console.log("Final Value:", finalValue);
  }, [number, processNumber]);

  return (
    <div className="element-section">
      <input
        type="number"
        placeholder="Enter a number"
        value={number}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Pipe;
