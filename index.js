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
const path = require("path");

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
app.use("/user", userRoute);
app.use("/", authRoute);

//Serve static assets if we are in production
if(process.env.NODE_ENV=="production"){
  //Set static folder
  app.use(express.static("./client/build"));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./client','build','index.html'))
  })
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("api is running"));
