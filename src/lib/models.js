import mongoose from "mongoose";
import { Schema } from "mongoose";

export const userModel = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

export const folderModel = new Schema(
  {
    name: String,
    mimeType: String,
    children: [folderModel]
  }
)

export const driveModel = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    template: folderModel
  }
);

export const User = mongoose.models?.User || mongoose.model("User", userModel);
export const FolderTemplate = mongoose.models?.FolderTemplate || mongoose.model("FolderTemplate", folderModel)
export const DriveTemplate = mongoose.models?.DriveTemplate || mongoose.model("DriveTemplate", driveModel)
