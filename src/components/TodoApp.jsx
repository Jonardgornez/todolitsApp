import TodoItems from "./TodoItems";
import Modal from "./Modal";
import TodoListsForm from "./TodoListsForm";
import { useContext, useState } from "react";
import Context from "../context/Context";

const TodoApp = () => {
  const {
    tasks,
    setTasks,
    modal,
    showModal,
    setId,
    setUpdatedName,
    updatedname,
  } = useContext(Context);
  const handleDelete = (index) => {
    setTasks((prev) => prev.filter((task, id) => id !== index));
  };
  const handleEdit = (index, task) => {
    setUpdatedName(task);

    setId(index);
    showModal(true);
  };

  return (
    <div className="wrapper">
      {modal && <Modal />}

      <div className="todo_wrapper">
        <div className="header">
          <h1>SimpleTodolists</h1>
        </div>
        <TodoListsForm />
        <ul className="todo_inputs">
          {tasks.length === 0 ? (
            <li>No data</li>
          ) : (
            tasks.map((task, index) => (
              <TodoItems
                tasks={task}
                key={index}
                handleDelete={() => handleDelete(index)}
                handleEdit={() => handleEdit(index, task)}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
