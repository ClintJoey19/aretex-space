import { getDriveTemplate } from "@/lib/data";
import { getDriveAccess } from "@/lib/gdrive";
import {v4 as uuid} from "uuid"

const getDrive = async (drive, driveId) => {
    try {
        const res = await drive.drives.get({
            driveId: driveId,
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        })
    
        return Response.json(res.data)
    } catch (err) {
        console.error(err.message);
    }
}

export const GET = async (req, res) => {
    const drive = await getDriveAccess(req, res)
    const fileId = res.params.id

    try {
        const res = await drive.files.get({
            fileId: fileId,
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        })

        const {id, driveId} = res.data

        if (id === driveId) {
            return getDrive(drive, driveId)
        }

        return Response.json(res.data)
    } catch (err) {
        console.error(err.message);
    }
}

const createFolders = async (drive, data, destinationId) => {
    try {
      for (const key in data) {
        if (data[key].mimeType === "application/vnd.google-apps.folder") {
          const folderName = data[key].name;
          const newFolder = await addFolder(drive, folderName, destinationId);
          console.log(
            `Folder "${folderName}" created with ID: ${newFolder.data.id}`
          );
          if (data[key].hasOwnProperty("children")) {
            await createFolders(drive, data[key].children, newFolder.data.id);
          }
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  
 const addFolder = async (drive, name, destinationId) => {
    try {
      const metadata = {
        name: name,
        mimeType: "application/vnd.google-apps.folder",
        parents: [destinationId],
      };
  
      const res = await drive.files.create({
        requestBody: metadata,
        requestId: uuid(),
        fields: "id",
        supportsAllDrives: true,
      });
  
      return res;
    } catch (err) {
      console.log(err.message);
    }
  }

export const POST = async (req, res) => {
    const drive = await getDriveAccess(req, res)
    const {name, template} = await req.json()
    const fileId = res.params.id

    try {
        const metadata = {
            name: name,
            mimeType: "application/vnd.google-apps.folder",
            parents: [fileId]
        }

        const res = await drive.files.create({
            requestBody: metadata,
            fields: "id",
            supportsAllDrives: true,
        })

        const destinationId = res.data.id
        const temp = await getDriveTemplate(template)

        if (temp) {
            await createFolders(drive, temp.template.root.children, destinationId)
        }

        console.log("File created");
        return Response.json(res.data)
    } catch (err) {
        console.error(err.message);
    }
}