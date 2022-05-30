import postModel from "../model/posts.js";
import userModel from "../model/user.js";
import { handleSuccess } from "../utils/handleRes.js";
import { CustomError } from "../utils/handleErrorAsync.js";

export const getPost = async ({ req, res }) => {
  const data = await postModel.find().populate({
    path: "user",
    select: "name photo",
  });
  handleSuccess(res, data);
};

export const postPost = async ({ req, res, next }) => {
  const data = req.body;
  if (data.content) {
    const post = await postModel.create({
      user: req.user._id,
      content: data.content,
      image: data.image,
      comments: data.comments,
    });
    handleSuccess(res, post);
  } else {
    next(CustomError(res, "發表失敗", next));
  }
};

export const updatePost = async ({ req, res, next }) => {
  const data = req.body;
  const { id } = req.params;
  if (id && data.content) {
    const updatePost = await postModel.findByIdAndUpdate(data.id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatePost) {
      return next(CustomError(res, "找不到ID", next));
    }
    handleSuccess(res, updatePost);
  } else {
    next(CustomError(res, "更新失敗", next));
  }
};

export const deletePost = async ({ req, res }) => {
  const { id } = req.params;
  const deletePost = await postModel.findByIdAndDelete(id);
  handleSuccess(res, deletePost);
};
