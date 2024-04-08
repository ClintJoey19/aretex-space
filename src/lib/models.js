
import { Schema, models, model } from "mongoose";

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
    children: [{
      type: Schema.Types.ObjectId,
      ref: "FolderTemplate"
    }]
  }
)

export const driveModel = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    template: {
      type: Schema.Types.ObjectId,
      ref: "FolderTemplate"
    }
  }
);

export const User = models?.User || model("User", userModel);
export const FolderTemplate = models?.FolderTemplate || model("FolderTemplate", folderModel)
export const DriveTemplate = models?.DriveTemplate || model("DriveTemplate", driveModel)
