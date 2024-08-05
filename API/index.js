import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import testRoute from "./routes/test.js";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import passwordsRoute from "./routes/passwords.js";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";


const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
const connect = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});
//middlewares


app.use(cookieParser());
app.use(session({
  secret: 'MJ45',
  resave: false,
  saveUninitialized: false
}));

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}), (err, req, res, next) => {

  const errorStatus = err.status || 500
  const errorMessage = err.message || ("Something Went Wrong")
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    Message: errorMessage,
    stack: err.stack
  })
});
app.use(express.json())

app.use("/", testRoute);
app.use("/auth", authRoute)
app.use("/users", usersRoute);
app.use("/passwords", passwordsRoute);



app.listen(3001, (req, res) => {
  connect()
  console.log("Server started on port 3001!")
  console.log(process.env.NODE_ENV);
});

