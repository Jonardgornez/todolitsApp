import Button from "./Button";
import { Trash, SquarePen } from "lucide-react";

const TodoItems = ({ tasks, handleDelete, handleEdit }) => {
  return (
    <li>
      <p>{tasks}</p>
      <div className="btn_wrapper">
        <Button className={"btn_edit"} onClick={handleEdit}>
          <SquarePen />
        </Button>
        <Button className={"btn_delete"} onClick={handleDelete}>
          <Trash />
        </Button>
      </div>
    </li>
  );
};

export default TodoItems;
