import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
//import "@testing-library/jest-dom";
import TodoList from "../TodoList";
import { TodoContext } from "../Contexts/TodoContext";
import { TodoItem } from "../Contexts/TodoContext";
//import "@testing-library/jest-dom";

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

describe("TodoList Functionality", () => {
  beforeEach(() => {
    const mockTodoItems: TodoItem[] = [
      {
        id: "1",
        title: "Test Title",
        content: "Test Content",
        category: "Test Category",
        ticked: false,
      },
    ];

    const mockContextValue = {
      todoList: mockTodoItems,
      setTodoList: vi.fn(),
      deleteTodoItem: vi.fn(),
      updateTodoItem: vi.fn(),
      addTodoItem: vi.fn(),
    };

    render(
      <TodoContext.Provider value={mockContextValue}>
        <TodoList />
      </TodoContext.Provider>
    );
  });

  it("shows edit fields when edit button is clicked", async () => {
    const editButton = screen.getByRole("button", { name: "Edit" });
    fireEvent.click(editButton);

    expect(screen.getByDisplayValue("Test Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Content")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Category")).toBeInTheDocument();
  });
});

it("calls handleDelete when delete button is clicked", async () => {
  const deleteTodoItemMock = vi.fn();

  const mockContextValue = {
    todoList: [
      {
        id: "1",
        title: "Test Title",
        content: "Test Content",
        category: "Test Category",
        ticked: false,
      },
    ],
    setTodoList: vi.fn(),
    deleteTodoItem: deleteTodoItemMock,
    updateTodoItem: vi.fn(),
    addTodoItem: vi.fn(),
  };

  render(
    <TodoContext.Provider value={mockContextValue}>
      <TodoList />
    </TodoContext.Provider>
  );

  const deleteButton = screen.getByRole("button", { name: "Delete" });
  fireEvent.click(deleteButton);

  expect(deleteTodoItemMock).toHaveBeenCalled();
});
