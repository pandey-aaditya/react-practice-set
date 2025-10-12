import { useState } from "react";
import { useCurry } from "../../hooks";

const Curry = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChange = useCurry(updateField);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="element-section">
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => handleChange("firstName")(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => handleChange("lastName")(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => handleChange("age")(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Curry;
