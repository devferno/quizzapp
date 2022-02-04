const express = require("express");
const app = express();
const Question = require("./models/question");
const mongoose = require("mongoose");
const questionroute = require("./routes/question");
const authRoute = require("./routes/auth");
const subjectroute = require("./routes/subject");
const userRoute = require("./routes/user");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(
  "mongodb+srv://devferno:fernouny89@cluster0.jqdda.mongodb.net/crudOne?retryWrites=true&w=majority",
  {},
  () => console.log("mongoose connected")
);
//midellware
app.use(express.json());
app.use(cors());

//routes middelware
app.use("/question", questionroute);
app.use("/subject", subjectroute);
app.use("/user",userRoute);
app.use("/", authRoute);

app.listen(4000, () => console.log("api is running"));
