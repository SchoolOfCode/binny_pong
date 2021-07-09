import { useEffect, useRef } from "react";

import { settings } from "../../config";

function Bin({ location, color }) {
  const canvasRef = useRef();

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, settings.canvas.width, settings.canvas.height);
    const { x, y } = location;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, settings.bin.width, settings.bin.height);
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, settings.bin.width, settings.bin.height);
  }, [location, canvasRef, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0 }}
      {...settings.canvas}
    ></canvas>
  );
}

export default Bin;
