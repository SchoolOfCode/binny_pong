import { render, screen } from "@testing-library/react";
import ControlsDisplay from "./index";
import * as actions from "../../libs/actions";

test("renders correct title", () => {
  render(
    <ControlsDisplay
      title="Test Title"
      dispatch={() => {}}
      state={{ cannon: { rotation: 50, power: 100 } }}
    />
  );
  const title = screen.getByText(/Test Title/i);
  expect(title).toBeInTheDocument();
});

test("input value controlled by state", async () => {
  render(
    <ControlsDisplay
      title="Test Title"
      dispatch={() => {}}
      state={{ cannon: { rotation: 50, power: 100 } }}
    />
  );
  const rotationInput = await screen.findByTestId("rotation-display");
  expect(rotationInput.innerHTML).toBe("50");
  const powerInput = await screen.findByTestId("power-display");
  expect(powerInput.innerHTML).toBe("100");
});
test("call dispatch correctly to fire ball", async () => {
  render(
    <ControlsDisplay
      title="Test Title"
      dispatch={(action) => {
        expect(action.type).toBe(actions.SET_IS_FIRING);
        expect(action.payload).toBe(true);
      }}
      state={{ cannon: { rotation: 50, power: 100 } }}
    />
  );
  const submitButton = await screen.findByTestId("submit");
  submitButton.click();
});
test("call dispatch correctly to randomise bins", async () => {
  render(
    <ControlsDisplay
      title="Test Title"
      dispatch={(action) => {
        expect(action.type).toBe(actions.RANDOMISE_TARGETS);
      }}
      state={{ cannon: { rotation: 50, power: 100 } }}
    />
  );
  const newTargetsButton = await screen.findByTestId("new-targets");
  newTargetsButton.click();
});
test("call dispatch correctly to reset", async () => {
  render(
    <ControlsDisplay
      title="Test Title"
      dispatch={(action) => {
        expect(action.type).toBe(actions.RESET);
      }}
      state={{ cannon: { rotation: 50, power: 100 } }}
    />
  );
  const newTargetsButton = await screen.findByTestId("reset");
  newTargetsButton.click();
});
