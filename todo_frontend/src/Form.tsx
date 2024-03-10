import { useState } from "react";
import { useTodoContext } from "./Contexts/UseTodoContext";
import "./styles/Form.scss";

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
    <form className="form__container" onSubmit={handleSubmit}>
      <h2 className="form__heading">New Item:</h2>
      <div className="form__item">
        <label htmlFor="title" className="form__label">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="form__input"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="form__item">
        <label htmlFor="content" className="form__label">
          Content:
        </label>
        <textarea
          id="content"
          name="content"
          className="form__input"
          value={formData.content}
          onChange={handleChange}
        />
      </div>
      <div className="form__item">
        <label htmlFor="category" className="form__label">
          Category:
        </label>
        <input
          type="text"
          id="category"
          name="category"
          className="form__input"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="form__btn">
        Submit
      </button>
    </form>
  );
};

export default Form;
