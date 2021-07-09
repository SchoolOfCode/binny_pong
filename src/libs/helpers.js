export function calculatePoints({ rotation = 1, power = 50, x, y }) {
  const x2 = x - power * Math.cos(rotation);
  const y2 = y - power * Math.sin(rotation);
  return [x2, y2];
}

export function getCollisionIndex(x, y, targets) {
  return targets.findIndex((target) => {
    return (
      x > target.x &&
      x < target.x + target.width &&
      y > target.y - 10 &&
      y < target.y + 10
    );
  });
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
