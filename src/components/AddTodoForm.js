import React from "react";
import { useDispatch } from "react-redux";
import { actions, addTodoAsync } from "../redux/todoSlice";

export default function AddTodoForm() {
  const [value, setValue] = React.useState("");

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("user entered", value);
    // dispatch(
    //   actions.addTodo({
    //     title: value,
    //   })
    // );

    //como se va a llamar de la api se utiliza la funcion async
    dispatch(
      addTodoAsync({
        title: value,
      })
    );
  };

  return (
    <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
      <label className="sr-only">Name</label>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Add todo..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit" className="btn btn-primary mb-2">
        Submit
      </button>
    </form>
  );
}
