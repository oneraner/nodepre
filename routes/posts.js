import express from "express";
import { handleErrorAsync } from "../utils/handleErrorAsync.js";
import {
  getPost,
  postPost,
  updatePost,
  deletePost,
} from "../controller/posts.js";

const router = express.Router();

router.get(
  "/posts",
  handleErrorAsync(async (req, res, next) => {
    getPost({ req, res, next });
  })
);

router.post(
  "/posts",
  handleErrorAsync(async (req, res, next) => {
    postPost({ req, res, next });
  })
);

router.patch(
  "/posts/:id",
  handleErrorAsync(async (req, res, next) => {
    updatePost({ req, res, next });
  })
);

router.delete(
  "/posts/:id",
  handleErrorAsync(async (req, res, next) => {
    deletePost({ req, res, next });
  })
);

export default router;
