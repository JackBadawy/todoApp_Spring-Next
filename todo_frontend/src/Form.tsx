import { useState } from "react";
import { useTodoContext } from "./Contexts/UseTodoContext";

const Form = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    ticked: false,
  });

  const { addTodoItem } = useTodoContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.category) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      await addTodoItem(formData);
      setFormData({ title: "", content: "", category: "", ticked: false });
    } catch (error) {
      console.error("Failed to create To-do Item", error);
      alert("Failed to create the To-do Item. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
