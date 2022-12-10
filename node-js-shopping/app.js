const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRouter = require("./routes/user");
const goodsRouter = require("./routes/goods");
console.log("asdad")
mongoose.connect("mongodb://localhost/shopping-demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("assets"));

app.use('/', userRouter);
app.use('/goods', goodsRouter);

app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
}); 

module.exports = app;