import React from "react";
import "../styles/header.css";
import colours from "../libs/colours.js";

const Header = ({ selectedColor, onSelectColor, onReset, onExecute }) => {
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
      <button className="run" onClick={onExecute}>
        Execute
      </button>
    </div>
  );
};

export default Header;
