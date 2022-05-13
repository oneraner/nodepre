import express from "express";
import connectDB from "./db.js";
import postRoute from "./routes/posts.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/", postRoute);
app.use((_req, res) => {
  res.status(404).send("抱歉，沒有這個頁面");
});
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("未知的錯誤，請嘗試重新整理");
});

connectDB();
app.use(cors());
app.listen(PORT);
