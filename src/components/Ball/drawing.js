export function drawCircle(x, y, radius, drawingContext) {
  drawingContext.beginPath();
  drawingContext.arc(x, y, radius, 0, Math.PI * 2);
  drawingContext.fill();
}
