import "./styles/TodoItems.scss";
import "./styles/Main.scss";
import { TodoProvider } from "./Contexts/TodoContext";
import Form from "./Form";
import TodoList from "./TodoList";

function App() {
  return (
    <>
      <TodoProvider>
        <Form />
        <TodoList />
      </TodoProvider>
    </>
  );
}

export default App;
