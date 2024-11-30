import React, { useState, useRef, useContext } from "react";
import Header from "../components/Header";
import Board from "../components/Board";
import colours from "../libs/colours";
import Additional from "../components/Additional";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { ContextProvider } from "../config/Context";

const Ceo = () => {
  const [finaloutput, setFinalOutput] = useState("");
  const [isloadingRes, setisloadingRes] = useState(false);
  const [image, setImage] = useState("");
  const { extraDesc, setExtraDesc } = useContext(ContextProvider);
  const [result, setisResult] = useState(false);
  const [color, setColor] = useState(colours[0]);
  const [description, setDescription] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control sidebar
  const canvasRef = useRef(null);

  const handleReset = () => {
    setisResult(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    }
  };

  const handleExecute = async () => {
    setisloadingRes(true);
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("Canvas not found.");
      return;
    }

    const image = canvas.toDataURL("image/png"); // Convert canvas content to image
    const payload = {
      image,
      extraDesc,
    };
    setImage(image);

    try {
      setTimeout(() => {
        setIsSidebarOpen(true); // Automatically open sidebar
        setisResult(true);
      }, 200);

      const response = await axios.post(
        "https://ceo-server.onrender.com/api/getdraw",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setisloadingRes(false);
        console.log("Data sent successfully.");
        console.log("Response:", response.data.data);
        setFinalOutput(response.data);
      } else {
        setisloadingRes(false);
        console.error("Failed to send data.");
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <>
      <Header
        result={result}
        selectedColor={color}
        onSelectColor={setColor}
        onReset={handleReset}
        onExecute={handleExecute}
        toggleSidebar={setIsSidebarOpen} // Pass the sidebar toggle function
      />
      <Board color={color} canvasRef={canvasRef} />
      <Additional
        onExecute={handleExecute}
        description={description}
        setDescription={setDescription}
      />
      <Sidebar
        output={finaloutput}
        isloadingRes={isloadingRes}
        setisloadingRes={setisloadingRes}
        image={image}
        isOpen={isSidebarOpen}
        toggleSidebar={setIsSidebarOpen} // Pass the state updater function
      />
    </>
  );
};

export default Ceo;
