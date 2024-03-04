import { createContext, useState, ReactNode, FC } from "react";
import {
  postTodoItem,
  deleteTodoItem,
  updateTodoItem,
} from "../services/todo-item-post-services";

interface TodoItem {
  id: string; //potentially make optional
  title: string;
  content: string;
  category: string;
}

interface TodoContextType {
  todoList: TodoItem[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  addTodoItem: (newItem: Omit<TodoItem, "id">) => Promise<void>;
  deleteTodoItem: (itemId: string) => Promise<void>;
  updateTodoItem: (
    itemId: string,
    todoData: Partial<TodoItem>
  ) => Promise<void>;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: FC<TodoProviderProps> = ({ children }) => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const addTodoItem = async (newItem: any) => {
    try {
      const addedItem = await postTodoItem(newItem);
      setTodoList((currentList) => [...currentList, addedItem]);
    } catch (error) {
      console.error("Error adding todo item", error);
    }
  };
  const deleteTodoItemContext = async (itemId) => {
    try {
      await deleteTodoItem(itemId);
      setTodoList((currentList) =>
        currentList.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting item from context:", error);
    }
  };

  const updateTodoItemContext = async (
    itemId: string,
    todoData: Partial<TodoItem>
  ): Promise<void> => {
    try {
      const updatedItem = await updateTodoItem(itemId, todoData);
      setTodoList((currentList) =>
        currentList.map((item) =>
          item.id === itemId ? { ...item, ...updatedItem } : item
        )
      );
    } catch (error) {
      console.error("Error updating todo item in context:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todoList,
        setTodoList,
        addTodoItem,
        deleteTodoItem: deleteTodoItemContext,
        updateTodoItem: updateTodoItemContext,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
