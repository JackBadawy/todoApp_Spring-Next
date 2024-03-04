import { createContext, useState, useContext, ReactNode, FC } from "react";
import {
  postTodoItem,
  deleteTodoItem,
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

  return (
    <TodoContext.Provider
      value={{
        todoList,
        setTodoList,
        addTodoItem,
        deleteTodoItem: deleteTodoItemContext,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
