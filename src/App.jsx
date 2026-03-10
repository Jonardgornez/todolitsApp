import TodoApp from "./components/TodoApp";

import TodoContext from "./context/TodoContext";

const App = () => {
  return (
    <TodoContext>
      <TodoApp />
    </TodoContext>
  );
};

export default App;
