const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Todo = require("./models/todo")

mongoose.connect("mongodb://localhost/todo-demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express();
const router = express.Router();

var todoRouter = require('./routes/todo')

router.get("/", (req, res) => {
  res.send("Hi!");
});

// router/todo.js
router.get("/todos", async(req, res) => {
  const todos = await Todo.find({}).sort("-order").exec();

  res.send({ todos });
});

router.post("/todos", async (req, res)=>{
  const {value} = req.body;

  const maxOrterTodo = await Todo.findOne().sort("-order").exec();
  let order = 1;

  if (maxOrterTodo){
    order = maxOrterTodo.order +1
  }

  const todo = new Todo({value, order});
  await todo.save();

  res.send({todo})
});

router.patch("/todos/:todoId", async (req, res) => {
  
  const {todoId} = req.params;

  const {order, value, done} = req.body;

  const todo = await Todo.findById(todoId).exec();
  if (order){
    const targetTodo = await Todo.findOne( {order} ).exec();
    if (targetTodo) {
      targetTodo.order = todo.order;
      await targetTodo.save();
    }
    todo.order = order;
  }
  else if (value){
    if (todo){
      todo.value = value;
    }
  }
  else if (done || done == false){
    if (todo){
      todo.done = done;
      todo.doneAt = new Date();
    }
  }
  await todo.save();
  res.send({});
});

router.delete('/todos/:todoId', async(req, res) => {
  const {todoId} = req.params;
  const todo = await Todo.findById(todoId);

  if (todo){
    await todo.delete();
  }
  res.send({});
})


app.use('/', todoRouter);
app.use("/api", bodyParser.json(), router);
app.use(express.static("./assets"));

app.listen(8080, () => {
  console.log("서버가 켜졌어요!");
});

