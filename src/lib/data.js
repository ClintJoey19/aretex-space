"use server"
import { connect } from "./connection";
import { User} from "./models";

export const getUsers = async () => {
  try {
    connect();
    const result = await User.find();
    return Response.json(result);
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (id) => {
  try {
    connect();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
  }
};

// export const getDriveTemplates = async () => {
//   try {
//     connect()
//     const templates = await DriveTemplate.find()
//     return Response.json(templates)
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// export const getDriveTemplate = async (id) => {
//   try {
//     connect()
//     const template = await DriveTemplate.findById(id)
//     return template
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// export const addTemplate = async (template) => {
//   try {
//     connect()
    

//   } catch (err) {
//     console.error(err.message);
//   }
// }