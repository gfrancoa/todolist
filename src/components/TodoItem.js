import React from "react";
import { useDispatch } from "react-redux";
import {
  actions,
  toggleCompleteAsync,
  deleteTodoAsync,
} from "../redux/todoSlice";

export default function TodoItem({ id, title, completed }) {
  const dispatch = useDispatch();

  const handleCompleteClick = () => {
    // dispatch(actions.toggleComplete({ id: id, completed: !completed }));
    // como se va a persistir en el back se cambia el método:
    dispatch(toggleCompleteAsync({ id: id, completed: !completed }));
  };

  const deleteTodo = () => {
    // dispatch(actions.deleteTodo({ id: id }));
    dispatch(deleteTodoAsync({ id: id }));
  };
  return (
    <li
      className="list-group-item"
      style={{ backgroundColor: completed ? "#90EE90" : "transparent" }}
    >
      <div className="d-flex justify-content-between">
        <span
          className="d-flex align-item-center"
          style={{ alignItems: "center" }}
        >
          <input
            type="checkbox"
            onChange={handleCompleteClick}
            className="mr-30"
            checked={completed}
          />
          {title}
        </span>
        <button onClick={deleteTodo} className="btn btn-danger">
          Delete
        </button>
      </div>
    </li>
  );
}
