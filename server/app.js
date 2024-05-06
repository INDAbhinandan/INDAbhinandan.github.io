const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
/**
 * creating the server
 */
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const port = 8080;
app.use(express.static(path.join(__dirname, "staticFile")));

app.get("/", (req, res) => {
  // res.send('server is runnig');
  res.sendFile(__dirname + "/staticFile/index.html");
});
console.log(__dirname + "/staticFile/index.html");

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

/** Connecting Database  */
mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database is connected");
  });

/** Creating Schema */
const Schema = mongoose.Schema;

const dataschema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  detail: { type: String, require: true },
});

const Data = mongoose.model("studentData", dataschema);

/** now create Post the data */
app.post("/submit", (req, res) => {
  const { name, email, detail } = req.body;
  const newdata = new Data({
    name,
    email,
    detail,
  });
  newdata.save();
  // res.redirect('/');
  res.send("data is saved in the database");
});
