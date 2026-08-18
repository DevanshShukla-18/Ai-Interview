const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Routes
const authRouter = require("../src/routes/auth.route");
const interviewRouter = require("../src/routes/interview.routes");


//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//API
app.use("/api/auth",authRouter);
app.use("/api/interview",interviewRouter);


module.exports = app;