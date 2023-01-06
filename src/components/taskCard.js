import React, { useState } from "react";
import axios from "axios";

function TaskCard(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(props.name);
  const [draftDescription, setDraftDescription] = useState(props.description);

  //Handles Editing formdata
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: props.status,
    id: props.id,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.description == "" || formData.description == " ") {
      formData.description = props.description;
    }

    if (formData.name == "" || formData.name == " ") {
      formData.name = props.name;
    }
    console.log(formData);
    setIsEditing(false);
    await axios
      .post("/update-task", formData)
      .then(window.location.reload(true));
  };

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
          <form id="taskForm" onSubmit={submitHandler}>
            <label htmlFor="name">Title:</label>
            <br />
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Task title"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            ></input>
            <br /> <br />
            <label htmlFor="description">Description:</label>
            <br />
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Task description"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></input>
            <br /> <br />
            <input type="submit" value="Submit"></input>
          </form>
          <br />
          <button
            style={{
              backgroundColor: "red",
              color: "white",
            }}
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
        </>
      )}
    </div>
  );
}

export default TaskCard;
