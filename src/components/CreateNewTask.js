import axios from "axios";
import React, { useState, useEffect } from "react";

const CreateNewTask = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Incomplete",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    await axios
      .post("/create-task", formData)
      .then(window.location.reload(true));
  };

  return (
    <div>
      <form id="taskForm" onSubmit={submitHandler}>
        <label htmlFor="name">Title:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          value={formData.name}
          placeholder="Task title"
        ></input>
        <br /> <br />
        <label htmlFor="description">Description:</label>
        <br />
        <input
          type="text"
          id="description"
          name="description"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          value={formData.description}
          placeholder="Task description"
        ></input>
        <br /> <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
};

export default CreateNewTask;
