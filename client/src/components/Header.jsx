import React from "react";
import "../styles/header.css";
import colours from "../libs/colours.js";

const Header = ({
  selectedColor,
  onSelectColor,
  onReset,
  onExecute,
  toggleSidebar,
  result,
}) => {
  return (
    <div className="header_con">
      <button className="reset" onClick={onReset}>
        Reset
      </button>
      <div className="colour_pallate">
        {colours.map((colour, index) => (
          <div
            key={index}
            className={`colour ${selectedColor === colour ? "active" : ""}`}
            style={{
              backgroundColor: colour,
              border: selectedColor === colour ? "2px solid white" : "none",
            }}
            onClick={() => onSelectColor(colour)} // Set color on click
          ></div>
        ))}
      </div>
      {result ? (
        <button className="view_result" onClick={() => toggleSidebar(true)}>
          View Result
        </button>
      ) : (
        <button className="run" onClick={onExecute}>
          Execute
        </button>
      )}
      {/* Button to manually toggle the sidebar */}
    </div>
  );
};

export default Header;
