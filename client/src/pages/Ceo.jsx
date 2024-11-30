import React, { useState, useRef } from "react";
import Header from "../components/Header";
import Board from "../components/Board";
import colours from "../libs/colours";
import Additional from "../components/Additional";
import axios from "axios";

const Ceo = () => {
  const [color, setColor] = useState(colours[0]);
  const [description, setDescription] = useState("");
  const canvasRef = useRef(null);

  const handleReset = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    }
  };

  const handleExecute = async () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("Canvas not found.");
      return;
    }

    const image = canvas.toDataURL("image/png"); // Convert canvas content to image
    const payload = {
      image,
      description,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/getdraw",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Data sent successfully.");
        console.log(response);
        // gql mutation 
      } else {
        console.error("Failed to send data.");
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <>
      <Header
        selectedColor={color}
        onSelectColor={setColor}
        onReset={handleReset}
        onExecute={handleExecute}
      />
      <Board color={color} canvasRef={canvasRef} />
      <Additional
        onExecute={handleExecute}
        description={description}
        setDescription={setDescription}
      />
    </>
  );
};

export default Ceo;
