import express from "express";
import connectDB from "./db.js";
import postRoute from "./routes/posts.js";
import userRoute from "./routes/users.js";
import cors from "cors";
import dotenv from "dotenv";
import logger from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;
process.on("uncaughtException", err => {
  console.error("Uncaughted Exception！");
  console.error(err);
  process.exit(1);
});
dotenv.config({ path: "./config.env" });
app.use(logger("dev"));
app.use(express.json());
app.use("/posts", postRoute);
app.use("/users", userRoute);
const resErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
    console.error("出現重大錯誤", err);
    res.status(500).json({
      status: "error",
      message: "系統錯誤，請洽系統管理員",
    });
  }
};
const resErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
app.use(function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "dev") {
    return resErrorDev(err, res);
  }
  if (err.name === "ValidationError") {
    err.message = "資料欄位未填寫正確，請重新輸入！";
    err.isOperational = true;
    return resErrorProd(err, res);
  }
  resErrorProd(err, res);
});
process.on("unhandledRejection", (err, promise) => {
  console.error("未捕捉到的 rejection：", promise, "原因：", err);
});

connectDB();
app.use(cors());
app.listen(PORT);
