/**
 * @jest-environment jsdom
 */

import { Todo } from "@/types";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoItem from "./TodoItem";

const mockTodo: Todo = {
  id: "1",
  text: "Write tests",
  isCompleted: false,
};

describe("ToDoItem", () => {
  it(" shoud have text", () => {
    render(
      <TodoItem todo={mockTodo} onClick={jest.fn()} onDelete={jest.fn()} />
    );
    expect(screen.getByText("Write tests")).toBeInTheDocument();
  });

  it("calls onClick when the checkbox is clicked", () => {
    const handleClick = jest.fn();
    render(
      <TodoItem todo={mockTodo} onClick={handleClick} onDelete={jest.fn()} />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(handleClick).toHaveBeenCalledWith("1");
  });
  it("line-through for  completed todo", () => {
    const completedTodo = { ...mockTodo, isCompleted: true };
    render(
      <TodoItem todo={completedTodo} onClick={jest.fn()} onDelete={jest.fn()} />
    );

    const text = screen.getByText("Write tests");
    expect(text).toHaveClass("line-through");
  });
});
