
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

// const driveModel = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   mimeType: {
//     type: String,
//     required: true,
//   },
//   children: [this], // This needs to be corrected
// });

// driveModel.add({ children: [driveModel] });

// // Define the driveTemplate schema using driveModel
// export const driveTemplateSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   template: {
//     name: {
//       type: String,
//       required: true,
//     },
//     mimeType: {
//       type: String,
//       required: true,
//     },
//     children: [driveModel], // Use driveModel here
//   },
// });

export const User = models?.User || model("User", userModel);
// export const DriveTemplateSchema = models?.DriveTemplateSchema || model("DriveTemplateSchema", driveTemplateSchema)
