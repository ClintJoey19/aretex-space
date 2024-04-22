import { Schema, models, model, Types } from "mongoose";

export const userModel = new Schema(
  {
    name: {
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

export const driveTemplateSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    template: {
      type: Object,
      required: true
    }
  },
  {
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    }
  },
)

export const DriveTemplate =
  models?.DriveTemplate ||
  model("DriveTemplate", driveTemplateSchema);

export const User = models?.User || model("User", userModel);
// export const FolderTemplate = models?.FolderTemplate || model("FolderTemplate", folderSchema)
// export const DriveTemplate = models?.DriveTemplate || model("DriveTemplate", driveTemplateSchema);
