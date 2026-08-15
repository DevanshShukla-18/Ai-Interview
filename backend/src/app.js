const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//Routes
const authRouter = require("../src/routes/auth.route");


//Middleware
app.use(express.json());
app.use(cookieParser());

//API
app.use("/api/auth",authRouter);


module.exports = app;