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

export const driveTemplateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  template: {
    type: Object,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
    required: true,
  },
});

export const DriveTemplate =
  models?.DriveTemplate || model("DriveTemplate", driveTemplateSchema);

export const User = models?.User || model("User", userModel);
