import { useState, useEffect } from "react";
import "./styles/TodoItems.scss";
import { useTodoContext } from "./Contexts/UseTodoContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { TodoItem } from "./Contexts/TodoContext";

const TodoList = () => {
  const { todoList, setTodoList, deleteTodoItem, updateTodoItem } =
    useTodoContext();
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleDelete = async (id) => {
    await deleteTodoItem(id);
  };

  const toggleIsTicked = async (todoItem: TodoItem) => {
    console.log("Toggling isTicked for item:", todoItem.id);
    const updatedIsTicked = !todoItem.ticked;
    console.log("New isTicked value:", updatedIsTicked);
    await updateTodoItem(todoItem.id, {
      ...todoItem,
      ticked: updatedIsTicked,
    });
  };

  const handleEdit = (todoItem: TodoItem) => {
    setEditItemId(todoItem.id);
    setEditFormData({
      title: todoItem.title,
      content: todoItem.content,
      category: todoItem.category,
    });
  };

  const handleUpdate = async (id: string) => {
    if (
      !editFormData.title ||
      !editFormData.content ||
      !editFormData.category
    ) {
      alert("Please fill out all required fields before saving.");
      return;
    }

    try {
      await updateTodoItem(id, {
        title: editFormData.title,
        content: editFormData.content,
        category: editFormData.category,
      });
      setEditItemId(null);
    } catch (error) {
      console.error("Failed to update To-do Item", error);
      alert("Failed to update the To-do Item. Please try again.");
    }
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
    console.log("todoList", todoList);
  }, []);

  return (
    <div className="todo">
      <h2>Todo Items</h2>
      <ul className="todo__list">
        {todoList.length === 0
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
                  <div
                    className={`item__txtbox ${
                      todoItem.ticked ? "item__struck-through" : ""
                    }`}
                  >
                    <h3>{todoItem.title}</h3>
                    <p>{todoItem.content}</p>
                    <p>Category: {todoItem.category}</p>
                  </div>
                )}
                <div className="item__btnbox">
                  {/* <button className="item__tickbtn">
                    isTicked: {todoItem.isTicked ? "true" : "false"}
                  </button> */}
                  <div
                    className="item__tckbox"
                    onClick={() => {
                      console.log(`Clicked tick box for item ${todoItem.id}`);
                      toggleIsTicked(todoItem);
                    }}
                  >
                    {todoItem.ticked ? <FontAwesomeIcon icon={faCheck} /> : ""}
                  </div>
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
