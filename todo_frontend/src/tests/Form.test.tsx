import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../Form.tsx";
import { TodoContext } from "../Contexts/TodoContext";
const mockTodoItems: TodoItem[] = [];

describe("Form", () => {
  it("renders correctly", () => {
    render(
      <TodoContext.Provider value={{ addTodoItem: vi.fn() }}>
        <Form />
      </TodoContext.Provider>
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});

it("updates input values on change", () => {
  render(
    <TodoContext.Provider value={{ addTodoItem: vi.fn() }}>
      <Form />
    </TodoContext.Provider>
  );

  const titleInput = screen.getByLabelText(/title/i);
  fireEvent.change(titleInput, { target: { value: "New Title" } });
  expect(titleInput.value).toBe("New Title");
});

describe("Form submission failure", () => {
  const mockAddTodoItem = vi.fn();
  window.alert = vi.fn();

  beforeEach(() => {
    mockAddTodoItem.mockReset();

    mockAddTodoItem.mockRejectedValue(new Error("Failed to create To-do Item"));

    render(
      <TodoContext.Provider value={{ addTodoItem: mockAddTodoItem }}>
        <Form />
      </TodoContext.Provider>
    );
  });

  it("handles errors on submission failure", async () => {
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: "Test Content" },
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "Test Category" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await vi.waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        "Failed to create the To-do Item. Please try again."
      );
    });
  });
});
