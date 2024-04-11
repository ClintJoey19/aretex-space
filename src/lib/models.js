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

const folderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "Folder"
    }
  ]
}, { timestamps: true })

// Define the driveTemplate schema using driveModel
export const driveTemplateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  template: {
    name: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Folder"
      }
    ], // Use driveModel here
  },
}, { timestamps: true });

export const User = models?.User || model("User", userModel);
export const FolderTemplate = models?.FolderTemplate || model("FolderTemplate", folderSchema)
export const DriveTemplate = models?.DriveTemplate || model("DriveTemplate", driveTemplateSchema);
