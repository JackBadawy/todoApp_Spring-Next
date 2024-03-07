import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../TodoList";
import { TodoContext } from "../Contexts/TodoContext";
import { TodoItem } from "../Contexts/TodoContext";
import "@testing-library/jest-dom";

const mockTodoItems: TodoItem[] = [];

describe("TodoList", () => {
  it("renders without crashing", () => {
    const mockContextValue = {
      todoList: mockTodoItems,
      setTodoList: vi.fn(), // Use vi.fn() for mock functions in Vitest
      deleteTodoItem: vi.fn(),
      updateTodoItem: vi.fn(),
      addTodoItem: vi.fn(),
    };

    render(
      <TodoContext.Provider value={mockContextValue}>
        <TodoList />
      </TodoContext.Provider>
    );

    expect(screen.getByText("Todo Items")).toBeInTheDocument();
    expect(screen.getByText("No Blogs")).toBeInTheDocument();
  });
});
