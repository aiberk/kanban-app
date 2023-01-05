import React from "react";
import { createRoot } from "react-dom/client";
import TaskCard from "./components/taskCard";

function App() {
  const tasks = [
    { name: "task-name", description: "task-description", status: "complete" },
    {
      name: "task-name2",
      description: "task-description2",
      status: "incomplete",
    },
  ];
  return (
    <div>
      <h1>Tasks:</h1>
      {tasks.map((task) => {
        return <TaskCard name={task.name} description={task.description} />;
      })}
    </div>
  );
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
