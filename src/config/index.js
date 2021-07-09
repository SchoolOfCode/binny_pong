import * as actions from "../libs/actions";

export const settings = {
  maxPower: 250,
  powerStep: 5,
  rotationStep: 5,
  maxRotation: Math.PI,
  bin: { height: 120, width: 100 },
  ball: { radius: 15 },
  canvas: {
    height: window.innerHeight - 20,
    width: window.innerWidth,
  },
  cannon: { width: 30 },
  keyMap: {
    ArrowUp: { type: actions.INCREMENT_POWER },
    ArrowDown: { type: actions.DECREMENT_POWER },
    ArrowRight: { type: actions.INCREMENT_ROTATION },
    ArrowLeft: { type: actions.DECREMENT_ROTATION },
    Enter: { type: actions.SET_IS_FIRING, payload: true },
  },
};

export const initialState = {
  isFiring: false,
  targets: [
    {
      x: 0,
      y: settings.canvas.height - settings.bin.height,
      width: settings.bin.width,
      height: settings.bin.height,
    },
    {
      x: settings.canvas.width - settings.bin.width,
      y: settings.canvas.height - settings.bin.height,
      width: settings.bin.width,
      height: settings.bin.height,
    },
  ],
  cannon: {
    x: settings.canvas.width / 2,
    y: settings.canvas.height,
    power: 50,
    rotation: 90,
  },
  collisionIndex: -1,
};
