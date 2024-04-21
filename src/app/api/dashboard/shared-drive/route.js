import { getDriveTemplate } from "@/lib/data";
import { getDriveAccess, getMembers } from "@/lib/gdrive";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";

export const GET = async (req, res) => {
  let nextPageToken = req.nextUrl.searchParams.get("nextPageToken") || null;
  const drive = await getDriveAccess(req, res);

  try {
    const result = await getSharedDrives(drive, nextPageToken);

    if (result) {
      return Response.json({ result });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    console.error(err.message);
    throw new Error("Error fetching shared drives");
  }
};

const getSharedDrives = async (drive, nextPageToken) => {
  let sharedDrives = [];

  try {
    const response = await drive.drives.list({
      pageToken: nextPageToken,
      pageSize: 10,
      fields: "drives(id, name, kind), nextPageToken",
    });

    const fetched = response.data.drives.map(async (item) => {
      const members = await getMembers(drive, item.id);
      return {
        id: item.id,
        name: item.name,
        capabilities: item.capabilities,
        createdTime: item.createdTime,
        members: members,
      };
    });

    sharedDrives = await Promise.all(fetched);
    const newToken = response.data.nextPageToken;

    console.log({ drives: sharedDrives.length });
    return { newToken, sharedDrives };
  } catch (err) {
    console.log(err.message);
    throw new Error("Failed to fetch shared drives");
  }
};

async function createFolders(drive, data, destinationId) {
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

async function addFolder(drive, name, destinationId) {
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
  const drive = await getDriveAccess(req, res);
  const { newDrive } = await req.json();

  try {
    const res = await drive.drives.create({
      resource: {
        name: newDrive.driveName,
      },
      requestId: uuid(),
    });

    const destinationId = res.data.id;
    const temp = await getDriveTemplate(newDrive.template);

    if (temp) {
      await createFolders(drive, temp.template.root.children, destinationId);
    }

    const members = await getMembers(drive, destinationId);

    const data = {
      ...res.data,
      members,
    };

    revalidatePath("/dashboard/shared-drives");
    return Response.json(data);
  } catch (err) {
    console.error(err.message);
  }
};

export const PATCH = async (req, res) => {
  const drive = await getDriveAccess(req, res);

  // get the id and newName from the client
};

export const DELETE = async (req, res) => {
  const drive = await getDriveAccess(req, res);

  // get the id to be deleted
};
