import express from "express";
import {
  getPost,
  postPost,
  updatePost,
  deletePost,
} from "../controller/posts.js";

const router = express.Router();

router.get("/posts", (req, res) => {
  getPost({ req, res });
});

router.post("/posts", (req, res) => {
  let body = "";
  req.on("data", chunk => {
    body += chunk;
  });
  req.on("end", () => postPost({ body, req, res }));
});

router.patch("/posts", (req, res) => {
  let body = "";
  req.on("data", chunk => {
    body += chunk;
  });
  req.on("end", () => updatePost({ body, req, res }));
});

router.delete("/posts/:id", (req, res) => {
  deletePost({ req, res });
});

export default router;
