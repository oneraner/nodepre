import postModel from "../model/posts.js";
import { handleSuccess, handleError } from "../utils/handleRes.js";

export const getPost = async ({ req, res }) => {
  const data = await postModel.find({});
  handleSuccess(res, data);
};

export const postPost = async ({ req, res }) => {
  try {
    const data = req.body;
    if (data.content) {
      const post = await postModel.create({
        userName: data.username,
        content: data.content,
      });
      handleSuccess(res, post);
    } else {
      handleError(res, "發表失敗");
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const updatePost = async ({ req, res }) => {
  try {
    const data = req.body;
    if (data.id) {
      const updatePost = await postModel.findByIdAndUpdate(data.id, data, {
        new: true,
      });
      handleSuccess(res, updatePost);
    } else {
      handleError(res, "更新失敗");
    }
  } catch (error) {
    handleError(res, error);
  }
};

export const deletePost = async ({ req, res }) => {
  try {
    const { id } = req.params;
    const deletePost = await postModel.findByIdAndDelete(id);
    handleSuccess(res, deletePost);
  } catch (error) {
    handleError(res, error);
  }
};
