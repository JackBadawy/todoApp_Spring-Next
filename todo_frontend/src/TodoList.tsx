import { useState, useEffect } from "react";
import "./styles/TodoItems.scss";
import { useTodoContext } from "./Contexts/UseTodoContext";

const TodoList = () => {
  const { todoList, setTodoList, deleteTodoItem, updateTodoItem } =
    useTodoContext();
  const [editItemId, setEditItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleDelete = async (id) => {
    await deleteTodoItem(id);
  };

  const handleEdit = (todoItem) => {
    setEditItemId(todoItem.id);
    setEditFormData({
      title: todoItem.title,
      content: todoItem.content,
      category: todoItem.category,
    });
  };

  const handleUpdate = async (id) => {
    await updateTodoItem(id, editFormData);
    setEditItemId(null);
  };

  const handleChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
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
    console.log(todoList);
  }, []);

  return (
    <div className="todo">
      <h2>Todo Items</h2>
      <ul className="todo__list">
        {!todoList
          ? "No Blogs"
          : todoList.map((todoItem) => (
              <li key={todoItem.id} className="todo__list__item">
                {editItemId === todoItem.id ? (
                  <div>
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleChange}
                    />
                    <textarea
                      name="content"
                      value={editFormData.content}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="category"
                      value={editFormData.category}
                      onChange={handleChange}
                    />
                    <button onClick={() => handleUpdate(todoItem.id)}>
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="item__txtbox">
                    <h3>{todoItem.title}</h3>
                    <p>{todoItem.content}</p>
                    <p>Category: {todoItem.category}</p>
                  </div>
                )}
                <div className="item__btnbox">
                  <button className="item__tickbtn">
                    isTicked: {todoItem.isTicked ? "true" : "false"}
                  </button>
                  <button
                    className="item__dltbtn"
                    onClick={() => handleDelete(todoItem.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="item__editbtn"
                    onClick={() => handleEdit(todoItem)}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default TodoList;
