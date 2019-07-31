const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const url = "mongodb://localhost:27017/wow-data";

//This line connects mongoose to our mongoDB database
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log(`The application is connected to the mongo db databse`);
  })
  .catch(err => {
    console.log(`The mongo db failed to connect because ${err}`);
  });

//import routes
const loginRoute = require("./routes/Login");
const homeRoute = require("./routes/Home");
const roomRoute = require("./routes/Room");

//this creates the express object. THIS OBJECT
const app = express();

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//This forces express to set handlebars as it's template engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//This code is needed to load all static files (images,css,js)
app.use(express.static("public"));

//This loads all your route modules
app.use("/", loginRoute);

app.use("/user", homeRoute);

app.use("/task", roomRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`The web server is connected!!`);
});
