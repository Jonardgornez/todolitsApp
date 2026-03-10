import { useEffect, useState } from "react";
import Context from "./Context";

const TodoContext = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [modal, showModal] = useState(false);
  const [id, setId] = useState(null);
  const [updatedname, setUpdatedName] = useState("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <Context.Provider
      value={{
        tasks,
        setTasks,
        modal,
        showModal,
        setId,
        setUpdatedName,
        updatedname,
        id,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default TodoContext;
