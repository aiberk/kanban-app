const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const sanitizeHtml = require("sanitize-html");

let db;
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("../public"));

//Translate to Json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Sanitizes html from injection attacks
const cleanup = (req, res, next) => {
  if (typeof req.body.name != "string") req.body.name = "sanitized";
  if (typeof req.body.decription != "string") req.body.name = "";
  req.cleanData = {
    name: sanitizeHtml(req.body.name.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),
    description: sanitizeHtml(req.body.description.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),
  };
  next();
};

//Home page
app.get("/", async (req, res) => {
  const allTasks = await db.collection("Tasks").find().toArray();
  console.log(allTasks);
  res.render("home", { allTasks });
});

//Adming Page
app.get("/admin", (req, res) => {
  res.render("admin");
});

//Tasks list api
app.get("/api/tasks", async (req, res) => {
  const allTasks = await db.collection("Tasks").find().toArray();
  res.json(allTasks);
});

//Create new tasks POST request
//For some reason  not posting all data
app.post("/create-task", cleanup, async (req, res) => {
  console.log(req);
  const newData = await db.collection("Tasks").insertOne(req.cleanData);
  const newTask = await db
    .collection("Tasks")
    .findOne({ _id: new ObjectId(newData.insertId) });
  res.send(newTask);
});

// Pulls data from Mongo
async function startDB() {
  const client = new MongoClient(
    "mongodb://root:root@localhost:27017/Kanban-App?&authSource=admin"
  );
  await client.connect();
  db = client.db();
  app.listen(3000);
}
startDB();

// const mongoose = require("mongoose");
// const cors = require("cors");
// const UserRoute = require("./routes/UserRoute.js");

// // import express from "express";
// // import mongoose from "mongoose";
// // import cors from "cors";
// // import UserRoute from "./routes/UserRoute.js";

// const app = express();
// mongoose.connect("mongodb://127.0.0.1:27017/kanbanapp_db", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", (error) => console.log(error));
// db.once("open", () => console.log("Database Connected..."));

// app.use(cors());
// app.use(express.json());
// app.use(UserRoute);

// app.listen(6000, () => console.log("Server up and running..."));
