import { useReducer } from "react";

import Bin from "../Bin";
import Cannon from "../Cannon";
import Ball from "../Ball";
import ControlsDisplay from "../ControlsDisplay";
import DraggableWrapper from "../DraggableWrapper";

import { initialState } from "../../config";
import { reducer } from "../../libs/reducer";

import css from "./App.module.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { power, rotation } = state.cannon;
  const normalisedCannonSettings = {
    ...state.cannon,
    power: power / 100,
    rotation: rotation / 180,
  };

  return (
    <div className={css.mainContainer}>
      <div className={css.canvasContainer}>
        <Ball
          isFiring={state.isFiring}
          targets={state.targets}
          {...normalisedCannonSettings}
          dispatch={dispatch}
        />
        {state.targets.map((target, i) => (
          <Bin
            key={i}
            location={target}
            color={i === state.collisionIndex ? "lightgreen" : "lightblue"}
          />
        ))}
        <Cannon {...normalisedCannonSettings} />
      </div>
      <DraggableWrapper>
        {!state.isFiring && (
          <ControlsDisplay
            title="Binny Pong"
            dispatch={dispatch}
            state={state}
          />
        )}
      </DraggableWrapper>
    </div>
  );
}

export default App;
