const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const sanitizeHtml = require("sanitize-html");

let db;
const app = express();
//Use ejs to user react
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("../public"));

//Translate to Json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Sanitizes html from injection attacks
const cleanup = (req, res, next) => {
  // need beteer clearup of types
  // if (typeof req.body.name != "string") req.body.name = "sanitized";
  // if (typeof req.body.decription != "string") req.body.description = "";
  // if (typeof req.body.status != "string") req.body.status = "Incomplete";
  req.cleanData = {
    name: sanitizeHtml(req.body.name.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),
    description: sanitizeHtml(req.body.description.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    }),
    status: sanitizeHtml(req.body.status.trim(), {
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

//Admin Page
app.get("/admin", (req, res) => {
  res.render("admin");
});

//Tasks list api
app.get("/api/tasks", async (req, res) => {
  const allTasks = await db.collection("Tasks").find().toArray();
  res.json(allTasks);
});

//Create new tasks POST request
app.post("/create-task", cleanup, async (req, res) => {
  const newData = await db.collection("Tasks").insertOne(req.cleanData);
  const newTask = await db
    .collection("Tasks")
    .findOne({ _id: new ObjectId(newData.insertId) });
  res.send(newTask);
});

//Edits task info
app.post("/update-task", cleanup, async (req, res) => {
  console.log(req.body);
  console.log(req.cleanData);
  let updateTask = await db.collection("Tasks").updateOne(
    { _id: new ObjectId(req.body.id) },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
      },
    }
  );

  res.send(updateTask);
});

//Deletes task by using its id number
app.delete("/task/:id", async (req, res) => {
  if (typeof req.params.id != "string") req.params.id = "";
  db.collection("Tasks").deleteOne({ _id: new ObjectId(req.params.id) });
  res.send("Item Deleted");
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
