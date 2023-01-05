import React, { useState } from "react";
import axios from "axios";

function TaskCard(props) {
  return (
    <div style={{ border: "1px solid gray", padding: "2rem" }}>
      <h2>{props.name}</h2>
      <p>{props.description ? props.description : "Empty Prop Name"}</p>
      <button
        onClick={async () => {
          const test = axios.delete(`/tasks/${props.id}`);
          console.log("Delete hit");
          props.setTasks((prev) => {
            return prev.filter((task) => {
              return task._id != props.id;
            });
          });
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;
