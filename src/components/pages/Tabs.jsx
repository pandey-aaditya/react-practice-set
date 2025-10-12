import { useState } from "react";

const Tabs = () => {
  const tabItems = Array.from({ length: 10 }, (_, i) => ({
    label: `Tab${i + 1}`,
    value: `tab${i + 1}`,
  }));

  const [activeTab, setActiveTab] = useState(tabItems[0]);
  const handleSelectTab = (tab) => setActiveTab(tab);

  return (
    <div className="tab-container">
      <div className="tab-item-container">
        {tabItems.map((item, index) => {
          return (
            <div
              key={index}
              className="tab-item"
              onClick={() => handleSelectTab(item)}
              aria-selected={activeTab.value === item.value}
            >
              {item.label}
            </div>
          );
        })}
      </div>
      <div className="tab-item-content">
        {`This is ${activeTab.label} content`}
      </div>
    </div>
  );
};

export default Tabs;
