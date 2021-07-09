import * as actions from "./actions";
import { settings, initialState } from "../config/index";
import { getRandomInt } from "./helpers";

export function reducer(state, action) {
  switch (action.type) {
    case actions.RANDOMISE_TARGETS:
      return {
        ...state,
        collisionIndex: -1,
        isFiring: false,
        targets: state.targets.map((bin) => {
          return {
            ...bin,
            x: getRandomInt(0, settings.canvas.width - settings.bin.width),
          };
        }),
      };
    case actions.RESET:
      return { ...initialState };
    case actions.SET_IS_FIRING:
      return { ...state, isFiring: action.payload };
    case actions.SET_COLLISION_INDEX:
      return { ...state, isFiring: false, collisionIndex: action.payload };
    case actions.INCREMENT_POWER:
      return {
        ...state,
        isFiring: false,
        cannon: {
          ...state.cannon,
          power: state.cannon.power + settings.powerStep,
        },
      };
    case actions.DECREMENT_POWER:
      return {
        ...state,
        isFiring: false,
        cannon: {
          ...state.cannon,
          power: state.cannon.power - settings.powerStep,
        },
      };
    case actions.INCREMENT_ROTATION:
      return {
        ...state,
        isFiring: false,
        cannon: {
          ...state.cannon,
          rotation: state.cannon.rotation + settings.rotationStep,
        },
      };
    case actions.DECREMENT_ROTATION:
      return {
        ...state,
        isFiring: false,
        cannon: {
          ...state.cannon,
          rotation: state.cannon.rotation - settings.rotationStep,
        },
      };
    case actions.ADD_TARGET:
      return {
        ...state,
        isFiring: false,
        targets: [
          ...state.targets,
          {
            x: getRandomInt(0, settings.canvas.width - settings.bin.width),
            y: settings.canvas.height - settings.bin.height,
            width: settings.bin.width,
            height: settings.bin.height,
          },
        ],
      };
    case actions.REMOVE_TARGET:
      return {
        ...state,
        isFiring: false,
        targets: state.targets.slice(0, state.targets.length - 1),
      };
    default:
      return state;
  }
}
