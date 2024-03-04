export const getAllTodoItems = async () => {
  const response = await fetch("http://localhost:8080/items");
  if (!response.ok) {
    throw new Error("Failed to get To-do Items");
  }
  const data = await response.json();
  return data;
};

export const postTodoItem = async (todoData) => {
  try {
    const response = await fetch("http://localhost:8080/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });

    if (!response.ok) {
      throw new Error("Failed to create To-do item");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating To-do Item:", error.message);
    throw error;
  }
};

export const deleteTodoItem = async (itemId) => {
  try {
    const response = await fetch(`http://localhost:8080/items/${itemId}`, {
      method: "Delete",
    });

    if (!response.ok) {
      throw new Error("Failed to delete To-do item");
    }
  } catch (error) {
    console.error("Error deleting To-do Item:", error.message);
    throw error;
  }
};

export const updateTodoItem = async (itemId, todoData) => {
  try {
    const response = await fetch(`http://localhost:8080/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });

    if (!response.ok) {
      throw new Error("Failed to update To-do item");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating To-do Item:", error.message);
    throw error;
  }
};
