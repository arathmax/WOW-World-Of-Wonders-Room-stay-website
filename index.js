const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const favicon = require("express-favicon");

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
const adminLoginRoute = require("./routes/AdminLogin");
const adminPageRoute = require("./routes/AdminPage");
const addRoomPageRoute = require("./routes/AddRoom");

const guestHomeRoute = require("./routes/GuestHome");
// const guestViewRoomRoute = require("./routes/GuestViewRoom");
const guestRoomListRoute = require("./routes/GuestRoomList");
const userSignupRoute = require("./routes/UserSignup");
const userHomeRoute = require("./routes/UserHome");
// const userViewRoomRoute = require("./routes/UserViewRoom");
const userRoomListRoute = require("./routes/UserRoomList");

//this creates the express object. THIS OBJECT
const app = express();

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// // parse application/json
app.use(bodyParser.json());

app.use(favicon(__dirname + "/public/images/logos/footer-wow-logo.png"));

// Use the session middleware
app.use(session({ secret: "keyboard cat", cookie: { maxAge: 60000 } }));

// //This forces express to set handlebars as it's template engine
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// //This code is needed to load all static files (images,css,js)
app.use(express.static("public"));
app.use(express.static("public/images"));
//This loads all your route modules

app.use((req, res, next) => {
  res.locals.userInfo = req.session.userInfo;

  next();
});

app.use("/", guestHomeRoute);
// app.use("/guest_view_room", guestViewRoomRoute);
app.use("/guest_room_list", guestRoomListRoute);

app.use("/user_signup", userSignupRoute);
app.use("/user", userHomeRoute);
// app.use("/user_view_room", userViewRoomRoute);
app.use("/user_room_list", userRoomListRoute);

app.use("/admin_login", adminLoginRoute);
app.use("/admin_page", adminPageRoute);
app.use("/add_room", addRoomPageRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`The web server is connected!!`);
});
