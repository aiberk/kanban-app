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

  const sortedbyTimeStamp = tasks.sort(function (a, b) {
    let timestamp_a = a._id.toString().substring(0, 8);
    let timestamp_b = b._id.toString().substring(0, 8);
    let date_a = new Date(parseInt(timestamp_a, 16) * 1000);
    let date_b = new Date(parseInt(timestamp_b, 16) * 1000);
    return Number(date_b) - Number(date_a);
  });

  const sortedbyName = tasks.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  return (
    <div>
      <CreateNewTask setTasks={setTasks} tasks={tasks} />
      <h1>Tasks:</h1>
      {sortedbyName.map((task) => {
        return (
          <TaskCard
            key={task._id}
            id={task._id}
            name={task.name}
            status={task.status}
            description={task.description}
            setTasks={setTasks}
          />
        );
      })}
    </div>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
