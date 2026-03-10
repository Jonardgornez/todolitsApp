import { useContext, useState } from "react";
import Context from "../context/Context";
import Button from "./Button";
import { X, SendHorizontal } from "lucide-react";

const Modal = () => {
  const { showModal, setId, updatedname, setUpdatedName, setTasks, tasks, id } =
    useContext(Context);

  const handleClose = () => {
    setId(null);
    setUpdatedName("");
    showModal(false);
  };

  const handleSubmit = () => {
    if (updatedname.trim() === "") return;
    const updateTasks = [...tasks];
    updateTasks[id] = updatedname;
    setTasks(updateTasks);
    setUpdatedName("");
    showModal(false);
  };
  return (
    <div className="modal_wrapper">
      <div className="modal">
        <div className="close">
          <Button className={"btn_close"} onClick={handleClose}>
            <X />
          </Button>
        </div>
        <div className="form">
          <input
            type="text"
            value={updatedname}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <Button className={"btn_update"} onClick={handleSubmit}>
            {" "}
            <SendHorizontal />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
