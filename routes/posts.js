import express from "express";
import { handleErrorAsync } from "../utils/handleErrorAsync.js";
import {
  getPost,
  postPost,
  updatePost,
  deletePost,
} from "../controller/posts.js";
import { isAuth } from "../utils/auth.js";

const router = express.Router();

router.get(
  "/",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    getPost({ req, res, next });
  })
);

router.post(
  "/",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    postPost({ req, res, next });
  })
);

router.patch(
  "/:id",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    updatePost({ req, res, next });
  })
);

router.delete(
  "/:id",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    deletePost({ req, res, next });
  })
);
export default router;
