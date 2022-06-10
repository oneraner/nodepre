import bcrypt from "bcryptjs";
import validator from "validator";
import userModel from "../model/users.js";
import { CustomError } from "../utils/handleErrorAsync.js";
import { generateSendJWT } from "../utils/auth.js";
import { handleSuccess } from "../utils/handleRes.js";

export const login = async ({ req, res, next }) => {
  const { email, password } = req.body;
  if (!password) {
    return next(CustomError(400, "未輸入密碼", next));
  }
  if (!validator.isLength(password, { min: 7 })) {
    return next(CustomError(400, "密碼長度錯誤", next));
  }
  if (!validator.isEmail) {
    return next(CustomError(400, "E-mail 格式錯誤", next));
  }
  const userData = await userModel
    .findOne({
      email,
    })
    .select("+password");
  const auth = await bcrypt.compare(password, userData.password);
  if (!auth) {
    return next(CustomError(400, "密碼錯誤", next));
  }
  generateSendJWT(userData, 200, res);
};

export const register = async ({ req, res, next }) => {
  const data = req.body;
  if (!data.name || !data.password) {
    return next(CustomError(400, "欄位未填", next));
  }
  if (!validator.isLength(data.password, { min: 7 })) {
    return next(CustomError(400, "密碼長度錯誤", next));
  }
  if (!validator.isEmail) {
    return next(CustomError(400, "E-mail 格式錯誤", next));
  }
  const password = await bcrypt.hash(req.body.password, 12);
  const newUser = await userModel.create({ ...data, password });
  generateSendJWT(newUser, 201, res);
};

export const updatePassword = async ({ req, res, next }) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(CustomError("400", "密碼不一致", next));
  }
  const newPassword = await bcrypt.hash(password, 12);
  const user = await userModel.findByIdAndUpdate(req.user.id, {
    password: newPassword,
  });
  generateSendJWT(user, 200, res);
};

export const getProfile = async ({ req, res, next }) => {
  const { _id } = req.user;
  const userInfo = await userModel.findById(_id, "_id photo sex createdAt");
  handleSuccess(res, userInfo);
};

export const updateProfile = async ({ req, res, next }) => {
  const userInfo = req.body;
  const oldUserData = await userModel.findById(_id, "_id photo sex createdAt");
  const updateUserInfo = await userModel.findByIdAndUpdate(
    req.user.id,
    { ...oldUserData, ...userInfo },
    {
      new: true,
      runValidators: true,
    }
  );
  handleSuccess(res, updateUserInfo);
};
