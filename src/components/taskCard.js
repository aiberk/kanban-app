import React from "react";

function TaskCard(props) {
  return (
    <div style={{ border: "1px solid gray", padding: "2rem" }}>
      <h2>{props.name}</h2>
      <p>{props.description ? props.description : "Empty Prop Name"}</p>
    </div>
  );
}

export default TaskCard;
