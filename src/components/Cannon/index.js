import { useEffect, useRef } from "react";
import { calculatePoints } from "../../libs/helpers";
import { settings } from "../../config";

import css from "./Cannon.module.css";

function Cannon({ rotation, power, x, y }) {
  const canvasRef = useRef();

  useEffect(() => {
    if (!canvasRef.current) return;
    const [x2, y2] = calculatePoints({
      power: power * settings.maxPower,
      rotation: rotation * settings.maxRotation,
      x,
      y,
    });
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = `rgb(${power * 255}, ${255 - power * 255}, 0)`;
    ctx.clearRect(0, 0, settings.canvas.width, settings.canvas.height);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = settings.cannon.width;
    ctx.stroke();
  }, [rotation, power, canvasRef, x, y]);

  return (
    <canvas
      ref={canvasRef}
      className={css.canvas}
      {...settings.canvas}
    ></canvas>
  );
}

export default Cannon;
