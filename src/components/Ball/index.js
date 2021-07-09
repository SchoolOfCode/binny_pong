import { useEffect, useRef } from "react";
import { settings } from "../../config";
import { calculatePoints, getCollisionIndex } from "../../libs/helpers";
import { drawCircle } from "./drawing";
import * as actions from "../../libs/actions";

function Ball({
  isFiring = true,
  dispatch,
  targets,
  rotation,
  power,
  x,
  y,
  color = "gold",
  trailColor = "#edd96f",
}) {
  const canvasRef = useRef();
  const trailRef = useRef();

  useEffect(() => {
    if (!canvasRef.current || !trailRef.current || !isFiring) return;

    const ballContext = canvasRef.current.getContext("2d");
    const trailContext = trailRef.current.getContext("2d");

    ballContext.clearRect(0, 0, settings.canvas.width, settings.canvas.height);
    ballContext.fillStyle = color;
    trailContext.fillStyle = trailColor;
    let isAnimating = true;

    let [currentX, currentY] = calculatePoints({
      power: power * settings.maxPower,
      rotation: rotation * settings.maxRotation,
      x,
      y,
    });
    let dx = -(
      Math.cos(rotation * settings.maxRotation) *
      power *
      settings.maxPower *
      0.1
    );
    let dy = -(
      Math.sin(rotation * settings.maxRotation) *
      power *
      settings.maxPower *
      0.1
    );
    let trailRadius = settings.ball.radius / 10;
    let radius = settings.ball.radius;

    function animate() {
      ballContext.clearRect(
        0,
        0,
        settings.canvas.width,
        settings.canvas.height
      );

      if (currentY >= settings.canvas.height - settings.ball.radius) {
        isAnimating = false;
        return dispatch({ type: actions.SET_IS_FIRING, payload: false });
      }
      drawCircle(currentX, currentY, radius, ballContext);
      drawCircle(currentX, currentY, trailRadius, trailContext);

      currentX += dx;
      currentY += dy;
      dy += 0.2;

      const collisionIndex = getCollisionIndex(currentX, currentY, targets);
      if (collisionIndex >= 0) {
        isAnimating = false;
        return dispatch({
          type: actions.SET_COLLISION_INDEX,
          payload: collisionIndex,
        });
      }
      isAnimating && requestAnimationFrame(animate);
    }

    animate();
    return () => {
      isAnimating = false;
    };
  }, [isFiring, rotation, power, x, y, dispatch, color, targets, trailColor]);

  return (
    <>
      <canvas ref={trailRef} {...settings.canvas}></canvas>
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0 }}
        {...settings.canvas}
      ></canvas>
    </>
  );
}

export default Ball;
