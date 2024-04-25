"use server";
import { connect } from "./connection";
import { User, DriveTemplate } from "./models";
import { revalidatePath } from "next/cache";

export const getUsers = async () => {
  try {
    connect();
    const result = await User.find();
    return JSON.parse(JSON.stringify(result));
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

export const getUserByEmail = async (email) => {
  try {
    connect();
    const user = await User.findOne({ email });
    return JSON.parse(JSON.stringify(user));
  } catch (err) {
    console.error(err.message);
  }
};

export const getDriveTemplates = async () => {
  try {
    connect();
    const templates = await DriveTemplate.find();
    return JSON.parse(JSON.stringify(templates));
  } catch (err) {
    console.log(err.message);
  }
};

export const getDriveTemplate = async (id) => {
  try {
    connect();
    const template = await DriveTemplate.findById(id);
    return JSON.parse(JSON.stringify(template));
  } catch (err) {
    console.log(err.message);
  }
};

const createFolders = async (folderData) => {
  const createdFolders = [];
  const folder = new FolderTemplate(folderData);

  const savedFolder = await folder.save();
  createdFolders.push(savedFolder._id);

  console.log(createdFolders);

  if (folder.children && folder.children.length > 0) {
    for (const subfolder of folder.children) {
      const subfolderIds = await subfolder.save();
      createdFolders.push(subfolderIds);
      console.log(createFolders);
    }
  }

  return createdFolders;
};

export const addTemplate = async (template, userId) => {
  try {
    connect();

    const newTemplate = new DriveTemplate({
      name: template.name,
      template: template.template,
      createdBy: userId,
      updatedBy: userId,
    });

    const res = await newTemplate.save();

    revalidatePath("/dashboard/templates");
    return JSON.parse(JSON.stringify(newTemplate));
  } catch (err) {
    console.error(err.message);
  }
};

export const editTemplate = async (id, { name, template }, userId) => {
  try {
    connect();

    const updatedTemplate = {
      name,
      template,
      updatedBy: userId,
    };

    const res = await DriveTemplate.findByIdAndUpdate(id, updatedTemplate);

    if (res) {
      revalidatePath("/dashboard/templates");
      return JSON.parse(JSON.stringify(res));
    }
  } catch (err) {
    console.error(err.message);
  }
};

export const deleteTemplate = async (id) => {
  try {
    connect();

    // pending
    const res = await DriveTemplate.findByIdAndDelete(id);
    console.log(res);

    if (!res) {
      return { error: "Failed to delete the template" };
    }

    revalidatePath("/dashboard/templates");
    return { message: "Drive deleted" };
  } catch (err) {
    console.error(err.message);
  }
};
