import React, { useState } from "react";
import Header from "../components/Header";
import Board from "../components/Board";
import colours from "../libs/colours";
const Ceo = () => {
  const [color, setColor] = useState(colours[0]); // Default to the first color

  const handleReset = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    if (canvas) {
      // Clear the entire canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleExecute = () => {
    console.log("Execute button clicked");
    // Add any execution logic here
  };
  return (
    <div>
      <Header
        selectedColor={color}
        onSelectColor={setColor}
        onReset={handleReset}
        onExecute={handleExecute}
      />
      <Board color={color} />
    </div>
  );
};

export default Ceo;
