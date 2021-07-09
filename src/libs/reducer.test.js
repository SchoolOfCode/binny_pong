import { initialState, settings } from "../config/index";
import { reducer } from "./reducer";
import * as actions from "./actions";

import * as helpers from "./helpers";

jest.mock("./helpers.js");

describe("Reducer Tests", () => {
  it("SET_IS_FIRING", () => {
    const state = { isFiring: true };
    const action = { type: actions.SET_IS_FIRING, payload: false };
    const nextState = reducer(state, action);
    expect(nextState.isFiring).toBe(false);
  });

  it("RESET", () => {
    const state = {};
    const action = { type: actions.RESET };
    const nextState = reducer(state, action);
    expect(nextState).toStrictEqual(initialState);
  });

  it("RANDOMISE_TARGETS", () => {
    const state = {
      targets: [
        {
          x: 0,
          y: 0,
          width: 10,
          height: 10,
        },
        {
          x: 0,
          y: 0,
          width: 10,
          height: 10,
        },
      ],
    };
    const action = { type: actions.RANDOMISE_TARGETS };
    helpers.getRandomInt.mockReturnValue(999);

    const newState = reducer(state, action);

    const targetsAreAllRandomised = newState.targets.every(
      ({ x }) => x === 999
    );
    expect(targetsAreAllRandomised).toBe(true);
  });

  it("SET_COLLISION_INDEX", () => {
    const state = { collisionIndex: -1 };
    const action = { type: actions.SET_COLLISION_INDEX, payload: 5 };
    const newState = reducer(state, action);

    expect(newState.collisionIndex).toBe(5);
  });

  it("INCREMENT_POWER", () => {
    const initialPower = 700;
    const state = { cannon: { power: initialPower } };
    const action = { type: actions.INCREMENT_POWER };
    const newState = reducer(state, action);

    const expected = initialPower + settings.powerStep;
    const actual = newState.cannon.power;

    expect(actual).toBe(expected);
  });

  it("DECREMENT_POWER", () => {
    const initialPower = 700;
    const state = { cannon: { power: initialPower } };
    const action = { type: actions.DECREMENT_POWER };
    const newState = reducer(state, action);

    const expected = initialPower - settings.powerStep;
    const actual = newState.cannon.power;

    expect(actual).toBe(expected);
  });

  it("INCREMENT_ROTATION", () => {
    const initialRotation = 700;
    const state = { cannon: { rotation: initialRotation } };
    const action = { type: actions.INCREMENT_ROTATION };
    const newState = reducer(state, action);

    const expected = initialRotation + settings.rotationStep;
    const actual = newState.cannon.rotation;

    expect(actual).toBe(expected);
  });

  it("DECREMENT_ROTATION", () => {
    const initialRotation = 700;
    const state = { cannon: { rotation: initialRotation } };
    const action = { type: actions.DECREMENT_ROTATION };
    const newState = reducer(state, action);

    const expected = initialRotation - settings.rotationStep;
    const actual = newState.cannon.rotation;

    expect(actual).toBe(expected);
  });

  it("ADD_TARGET", () => {
    const state = { targets: [] };
    const action = { type: actions.ADD_TARGET };
    helpers.getRandomInt.mockReturnValue(999);

    const expected = {
      x: 999,
      y: settings.canvas.height - settings.bin.height,
      width: settings.bin.width,
      height: settings.bin.height,
    };

    const newState = reducer(state, action);

    expect(newState.targets.length).toBe(1);
    expect(newState.targets[0]).toEqual(expected);
  });

  it("REMOVE_TARGET", () => {
    const state = {
      targets: [
        {
          x: 999,
          y: settings.canvas.height - settings.bin.height,
          width: settings.bin.width,
          height: settings.bin.height,
        },
      ],
    };
    const action = { type: actions.REMOVE_TARGET };
    const newState = reducer(state, action);

    expect(newState.targets.length).toBe(0);
  });
});
