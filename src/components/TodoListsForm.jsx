import React, { useState } from "react";
import Button from "./Button";
import Context from "../context/Context";
import { SquarePlus } from "lucide-react";
import { useContext } from "react";

const TodoListsForm = () => {
  const { setTasks } = useContext(Context);
  const [createTask, setCreateTask] = useState("");
  const handleAdd = () => {
    if (createTask.trim() === "") return;
    setTasks((prev) => [...prev, createTask]);
    setCreateTask("");
  };
  return (
    <div className="todo_forms">
      <input
        type="text"
        placeholder="Enter Your Task"
        value={createTask}
        onChange={(e) => setCreateTask(e.target.value)}
      />
      <Button className={"btn_add"} onClick={handleAdd}>
        <SquarePlus />
      </Button>
    </div>
  );
};

export default TodoListsForm;
