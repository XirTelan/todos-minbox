/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import * as reactRedux from "react-redux";
import TodoInput from "./TodoInput";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("Todo input", () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    (reactRedux.useDispatch as unknown as jest.Mock).mockReturnValue(
      mockDispatch
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test("shows error message if input is empty and Enter is pressed", () => {
    render(<TodoInput />);

    const input = screen.getByPlaceholderText("What needs to be done?");

    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByText("Cant be empty")).toBeInTheDocument();
  });
  test("clears input after submit", async () => {
    render(<TodoInput />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    await userEvent.click(input);
    await userEvent.keyboard("test");
    await userEvent.keyboard("{enter}");
    await waitFor(() => expect(input).toHaveValue(""));
  });
});
