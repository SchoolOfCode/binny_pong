import { useEffect } from "react";

import Button from "../Button";
import { settings } from "../../config";
import * as actions from "../../libs/actions";
import css from "./ControlsDisplay.module.css";

const controls = [
  {
    title: "rotation",
    unit: "°",
    increment: { type: actions.INCREMENT_ROTATION },
    decrement: { type: actions.DECREMENT_ROTATION },
  },
  {
    title: "power",
    unit: "%",
    increment: { type: actions.INCREMENT_POWER },
    decrement: { type: actions.DECREMENT_POWER },
  },
];

function ControlsDisplay({ dispatch, state, title }) {
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: actions.SET_IS_FIRING, payload: true });
  }

  useEffect(() => {
    function handleKeyDown(e) {
      const action = settings.keyMap[e.key];
      if (action) {
        dispatch(action);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, state.cannon]);

  return (
    <div className={css.mainContainer} onSubmit={handleSubmit}>
      <h1 className={css.title}>{title}</h1>
      <div className={css.settingsContainer}>
        {controls.map(({ title, unit, increment, decrement }) => (
          <h2 className={css.settingsDisplay} key={title}>
            <Button onClick={() => dispatch(decrement)} variant="small">
              -
            </Button>
            <span>
              {title}:{" "}
              <span className={css.setting} data-testid={`${title}-display`}>
                {state.cannon[title]}
              </span>
              {unit}
            </span>
            <Button onClick={() => dispatch(increment)} variant="small">
              +
            </Button>
          </h2>
        ))}
      </div>
      <div className={css.buttonsContainer}>
        <Button
          data-testid="reset"
          className={css.button}
          onClick={() => dispatch({ type: actions.RESET })}
        >
          RESET
        </Button>
        <Button
          className={css.button}
          data-testid="remove-target"
          onClick={() => dispatch({ type: actions.REMOVE_TARGET })}
        >
          targets--
        </Button>
        <Button
          className={css.button}
          data-testid="new-targets"
          onClick={() => dispatch({ type: actions.RANDOMISE_TARGETS })}
        >
          NEW TARGETS
        </Button>
        <Button
          className={css.button}
          data-testid="add-target"
          onClick={() => dispatch({ type: actions.ADD_TARGET })}
        >
          targets++
        </Button>
        <Button
          className={css.button}
          data-testid="submit"
          onClick={() =>
            dispatch({ type: actions.SET_IS_FIRING, payload: true })
          }
        >
          {state.cannon.isFiring ? "stop" : "FIRE"}
        </Button>
      </div>
    </div>
  );
}
export default ControlsDisplay;
