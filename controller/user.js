import userModel from "../model/user.js";

export const getUser = async ({ req, res }) => {
  const data = await userModel.find({});
  handleSuccess(res, data);
};
