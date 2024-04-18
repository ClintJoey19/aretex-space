import { getDriveAccess } from "@/lib/gdrive";

export const getFiles = async (drive, id) => {
  const res = await drive.files.list({
    q: `'${id}' in parents and trashed = false`,
    fields: "files(id, name, mimeType)",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  const sorted = res.data.files.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  return sorted
} 

export const GET = async (req, res) => {
  const drive = await getDriveAccess(req, res);
  const id = res.params.id;

  try {
    const res = await getFiles(drive, id)

    return Response.json(res);
  } catch (err) {
    console.error(err.message);
  }
};


const deleteFileContents = async (drive, id) => {
  const files = await getFiles(drive, id)

  for (const file of files) {
    console.log(file);
    // try {
    //   const res = await drive.files.delete({
    //     fileId: id,
    //     fields: "id",
    //     supportsAllDrives: true
    //   })
      
    //   return res ? true : false
    // } catch (err) {
    //   console.error(err.message);
    // }
  }
  return true
}

export const DELETE = async (req, res) => {
  const drive = await getDriveAccess(req, res)
  const {driveId} = await req.json()
  
  try {
    const res = await drive.drives.delete({
      driveId: driveId,
      useDomainAdminAccess: true,
      allowItemDeletion: true
    })

    return Response.json(res)
  } catch (err) {
    console.error(err.message);
  }
}