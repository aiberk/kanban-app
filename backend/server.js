const { MongoClient } = require("mongodb");
const express = require("express");

let db;
const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("../public"));

app.get("/", async (req, res) => {
  const allTasks = await db.collection("Tasks").find().toArray();
  console.log(allTasks);
  res.render("home", { allTasks });
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

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
