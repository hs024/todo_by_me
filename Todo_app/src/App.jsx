import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  //! handle form
  const [taskname, settaskname] = useState("");
  const handleform = (e) => {
    settaskname(e.target.value);
    // console.log(taskname);
  };
  const [todos, settodos] = useState([]);
  const handlesubmit = (e) => {
    e.preventDefault();
    if (e.target.taskname.value.trim() != "") {
      settodos([...todos, e.target.taskname.value]);
      settaskname("");
      // localStorage.setItem("TODOS", JSON.stringify(todos));
    }
  };
  //! button function
  const done = (e) => {
    e.target.parentElement.style.textDecoration = "line-through";
  };
  const remove = (idx) => {
    settodos(
      todos.filter((ele, i) => {
        if (idx != i) {
          return ele;
        }
      })
    );
  };
  const edit = (idx) => {
    let ele = todos[idx];
    settodos(
      todos.filter((ele, i) => {
        if (idx != i) {
          return ele;
        }
      })
    );
    settaskname(ele);
    // localStorage.setItem("TODOS", JSON.stringify(todos));
  };
  //! use effect
  useEffect(() => {
    let arr = localStorage.getItem("TODOS");
    console.log("load to hua hai");

    if (arr) {
      settodos(JSON.parse(arr));
    }
  }, []);
  useEffect(() => {
    console.log("ja to raha hai");

    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos]);

  //! return  here
  return (
    <>
      <h1>Todo handle karenge yaha 😎</h1>
      <form action="" onSubmit={handlesubmit}>
        <label htmlFor="taskname">
          Task:{" "}
          <input
            type="text"
            name="taskname"
            value={taskname}
            onChange={handleform}
          />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
      <ul>
        <h2>Todo List:</h2>
        {todos?.map((e, i) => {
          return (
            <li key={i}>
              {e}
              <button onClick={done}>done</button>
              <button onClick={() => remove(i)}>remove</button>
              <button onClick={() => edit(i)}>edit</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
