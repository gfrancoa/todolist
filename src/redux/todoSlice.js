import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../utils/constants";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const response = await fetch(`${API_URL}/todos`);
    if (response.ok) {
      const todos = await response.json();
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title }),
    });

    if (response.ok) {
      const todo = await response.json();
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/completeTodoAsync",

  async (payload) => {
    const response = await fetch(`${API_URL}/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });

    if (response.ok) {
      const todo = await response.json();
      console.log("the todo from toggle compl async", todo);
      return { id: todo.id, completed: todo.completed };
    } else {
      console.log("this is the response", response);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload) => {
    const response = await fetch(`${API_URL}/todos/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const todos = await response.json();
      return { todos };
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    //     { id: 1, title: "todo1", completed: false },
    //     { id: 2, title: "todo2", completed: false },
    //     { id: 3, title: "todo3", completed: true },
  ], //dummy data in the meantime
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };

      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      console.log("Fetching data...");
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      console.log("Data fetched successfully");
      return action.payload.todos;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    },

    [toggleCompleteAsync.fulfilled]: (state, action) => {
      console.log("payload in fulfilled", action.payload);
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },

    [deleteTodoAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    },
  },
});

export const actions = todoSlice.actions;

export default todoSlice.reducer;
