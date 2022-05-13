import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "請輸入您的名字"],
  },
  email: {
    type: String,
    required: [true, "請輸入您的 Email"],
    unique: true,
    lowercase: true,
    select: false,
  },
  avatar: String,
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
