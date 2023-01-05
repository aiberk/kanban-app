import React from "react";

function TaskCard(props) {
  console.log(props);
  return (
    <div>
      <h1>taskCard</h1>
      <h2>{props.name}</h2>
      <h2>{props.description ? props.description : "Empty Prop Name"}</h2>
    </div>
  );
}

export default TaskCard;
