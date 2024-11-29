import React, { useEffect, useState } from "react";
import "../styles/board.css";

const Board = ({ color, canvasRef }) => {
  const [isDrawing, setIsDrawing] = useState(false); // Track drawing state
  const [ctx, setCtx] = useState(null); // Store canvas context

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

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && ctx) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
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

  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = color;
    }
  }, [color, ctx]);

  const startDrawing = (e) => {
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (ctx) {
      ctx.closePath();
      setIsDrawing(false);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="canvas_board"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
    />
  );
};

export default Board;
