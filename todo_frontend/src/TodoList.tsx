import { useState, useEffect } from "react";
import "./styles/TodoItems.scss";
import { useTodoContext } from "./Contexts/UseTodoContext";

const TodoList = () => {
  // const [todoList, setTodoList] = useState([]);
  const { todoList, setTodoList, deleteTodoItem } = useTodoContext();

  const handleDelete = async (id) => {
    await deleteTodoItem(id);
  };

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await fetch("http://localhost:8080/items");
        if (!response.ok) {
          throw new Error("Failed to fetch To-do List");
        }
        const data = await response.json();
        setTodoList(data);
      } catch (error) {
        console.error("Failed to fetch To-do List", error);
      }
    };

    fetchTodoList();
  }, []);

  return (
    <div className="todo">
      <h2>Todo Items</h2>
      <ul className="todo__list">
        {!todoList
          ? "No Blogs"
          : todoList.map((todoItem) => (
              <li key={todoItem.id} className="todo__list__item">
                <div className="item__txtbox">
                  <h3>{todoItem.title}</h3>
                  <p>{todoItem.content}</p>
                  <p>Category: {todoItem.category}</p>
                </div>
                <div className="item__btnbox">
                  <button
                    className="item__dltbtn"
                    onClick={() => handleDelete(todoItem.id)}
                  >
                    Delete
                  </button>
                  <button className="item__editbtn">Edit</button>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default TodoList;
