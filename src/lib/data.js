"use server";
import { connect } from "./connection";
import { User, DriveTemplate } from "./models";

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

export const getDriveTemplates = async () => {
  try {
    connect();
    const templates = await DriveTemplate.find();
    return Response.json(templates);
  } catch (err) {
    console.log(err.message);
  }
};

// export const getDriveTemplate = async (id) => {
//   try {
//     connect()
//     const template = await DriveTemplate.findById(id)
//     return template
//   } catch (err) {
//     console.log(err.message);
//   }
// }

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

export const addTemplate = async (template) => {
  try {
    connect();

    // const folderIds = await createFolders(folderStructure);

    const newTemplate = await DriveTemplate.create({
      name: template.name,
      template: {
        name: "Parent",
        mimeType: "drive",
        children: {
          uuid1: {
            name: "Folder 1",
            mimeType: "folder",
            children: {},
          },
          uuid2: {
            name: "Folder 2",
            mimeType: "folder",
            children: {
              uuid1: {
                name: "Sub Folder 1",
                mimeType: "folder",
                children: {},
              },
              uuid2: {
                name: "Sub Folder 2",
                mimeType: "folder",
                children: {},
              },
            },
          },
          uuid3: {
            name: "Folder 3",
            mimeType: "folder",
            children: {},
          },
        },
      },
    });

    console.log(newTemplate);
    // const res = await DriveTemplate.create(template);
    // console.log(res);
  } catch (err) {
    console.error(err.message);
  }
};
