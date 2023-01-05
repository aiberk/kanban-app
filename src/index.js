import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import TaskCard from "./components/taskCard";
import CreateNewTask from "./components/CreateNewTask";

function App() {
  const [tasks, setTasks] = useState([]);

  //Empty useEffect to only call the api once.
  useEffect(() => {
    async function getData() {
      const res = await axios.get("/api/tasks");
      setTasks(res.data);
    }
    getData();
  }, []);
  console.log(tasks);
  return (
    <div>
      <CreateNewTask setTasks={setTasks} />
      <h1>Tasks:</h1>
      {tasks.map((task) => {
        return (
          <TaskCard
            key={task._id}
            name={task.name}
            description={task.description}
          />
        );
      })}
    </div>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
