import { getDriveAccess } from "@/lib/gdrive";

export const getFiles = async (drive, id, token) => {
  const res = await drive.files.list({
    q: `'${id}' in parents and trashed = false`,
    fields: "files(id, name, mimeType), nextPageToken",
    pageSize: 10,
    pageToken: token,
    orderBy: "name",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  const nextPageToken = res.data.nextPageToken;

  const files = res.data.files.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  console.log(nextPageToken);

  return { nextPageToken, files };
};

export const GET = async (req, res) => {
  const drive = await getDriveAccess(req, res);
  const token = req.nextUrl.searchParams.get("nextPageToken") || null;
  const id = res.params.id;

  try {
    const res = await getFiles(drive, id, token);

    return Response.json(res);
  } catch (err) {
    console.error(err.message);
  }
};

export const DELETE = async (req, res) => {
  const drive = await getDriveAccess(req, res);
  const { driveId } = await req.json();

  try {
    const res = await drive.drives.delete({
      driveId: driveId,
      useDomainAdminAccess: true,
      allowItemDeletion: true,
    });

    return Response.json(res);
  } catch (err) {
    console.error(err.message);
  }
};
