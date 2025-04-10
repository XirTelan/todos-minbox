/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import TodosList from "./TodosList";
import * as hooks from "@/hooks/hooks";
import "@testing-library/jest-dom";

jest.mock("@/hooks/hooks", () => ({
  ...jest.requireActual("@/hooks/hooks"),
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockDispatch = jest.fn();

beforeEach(() => {
  (hooks.useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
});

afterEach(() => {
  jest.clearAllMocks();
});

const todosMock = [
  { id: "1", text: "Task 1", isCompleted: false },
  { id: "2", text: "Task 2", isCompleted: true },
];

describe.only("TodosList", () => {
  it("shows 'You tasks is empty' if no todos match the filter", () => {
    (hooks.useAppSelector as unknown as jest.Mock).mockReturnValue([]);

    render(<TodosList selectedCategory="all" />);

    expect(screen.getByText("You tasks is empty")).toBeInTheDocument();
  });

  it("renders only active todos when 'active' is selected", () => {
    (hooks.useAppSelector as unknown as jest.Mock).mockReturnValue(todosMock);

    render(<TodosList selectedCategory="active" />);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.queryByText("Task 2")).not.toBeInTheDocument();
  });

  it("renders only completed todos when 'completed' is selected", () => {
    (hooks.useAppSelector as unknown as jest.Mock).mockReturnValue(todosMock);

    render(<TodosList selectedCategory="completed" />);

    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});
