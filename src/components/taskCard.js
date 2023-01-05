import React, { useState } from "react";
import axios from "axios";

function TaskCard(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState("");
  const [draftDescription, setDraftDescription] = useState("");

  return (
    <div style={{ border: "1px solid gray", padding: "2rem" }}>
      {!isEditing && (
        <>
          {" "}
          <h2>{props.name}</h2>
          <p>{props.description ? props.description : "Empty Prop Name"}</p>
          <p>{props.status}</p>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: "1rem",
            }}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        </>
      )}
      {isEditing && (
        <>
          <h2>{props.name}</h2>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              marginRight: "1rem",
            }}
            onClick={() => {
              setIsEditing(false);
            }}
          >
            StopEdit
          </button>
        </>
      )}
      <button
        onClick={async () => {
          const test = axios.delete(`/task/${props.id}`);
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
