import React from "react";
import { useSelector } from "react-redux";

export default function TotalItems() {
  const completedTodos = useSelector((state) =>
    state.todos.filter((todo) => todo.completed === true)
  );

  return (
    <h4 className="mt-3">Total Completed Tasks: {completedTodos.length}</h4>
  );
}
