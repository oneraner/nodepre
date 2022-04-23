import "dotenv/config";
import mongoose from "mongoose";

const remoteDB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

const localDB = process.env.DATABASE_LOCAL;

const connectDB = async () => {
  try {
    await mongoose.connect(remoteDB);
    console.log("MongoDB 資料庫連接成功");
  } catch (error) {
    console.log("連接資料庫失敗：", error);
  }
};

export default connectDB;
