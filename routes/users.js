import express from "express";
import { handleErrorAsync } from "../utils/handleErrorAsync.js";
import {
  login,
  register,
  getProfile,
  updateProfile,
  updatePassword,
} from "../controller/users.js";
import { isAuth } from "../utils/auth.js";

const router = express.Router();

router.post(
  "/sign_in",
  handleErrorAsync(async (req, res, next) => {
    login({ req, res, next });
  })
);

router.post(
  "/sign_up",
  handleErrorAsync(async (req, res, next) => {
    register({ req, res, next });
  })
);

router.post(
  "/updatePassword",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    updatePassword({ req, res, next });
  })
);

router.get(
  "/profile",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    getProfile({ req, res, next });
  })
);

router.patch(
  "/profile",
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    updateProfile({ req, res, next });
  })
);

export default router;
