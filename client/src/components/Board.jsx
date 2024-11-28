import React, { useRef, useState, useEffect } from "react";
import "../styles/board.css";
import Additional from "./Additional";

const Board = ({ color }) => {
  const canvasRef = useRef(null); // Reference to the canvas element
  const [isDrawing, setIsDrawing] = useState(false); // Track drawing state
  const [ctx, setCtx] = useState(null); // Store canvas context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize the canvas context (only once)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      canvas.width = window.innerWidth; // Set canvas width
      canvas.height = window.innerHeight - canvas.offsetTop; // Set canvas height
      context.lineCap = "round";
      context.lineWidth = 3;
      setCtx(context);
    }

    // Handle window resize
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && ctx) {
        // Save current canvas content
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Resize canvas and restore content
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - canvas.offsetTop;
        ctx.putImageData(imageData, 0, 0);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update strokeStyle when color changes
  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = color;
    }
  }, [color, ctx]);

  // Handle mouse down to start drawing
  const startDrawing = (e) => {
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  // Handle mouse move to draw
  const draw = (e) => {
    if (!isDrawing || !ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  // Handle mouse up to stop drawing
  const stopDrawing = () => {
    if (ctx) {
      ctx.closePath();
      setIsDrawing(false);
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        id="canvas"
        className="canvas_board"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
      <Additional />
    </>
  );
};

export default Board;
