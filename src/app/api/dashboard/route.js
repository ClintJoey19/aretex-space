import { getDriveAccess } from "@/lib/gdrive";

export const GET = async (req, res) => {
  try {
    const drive = await getDriveAccess(req, res);
    let sharedDrives = [];
    let token = null;

    do {
      const res = await drive.drives.list({
        pageSize: 10,
        pageToken: token,
        fields: "drives(id, name, kind, createdTime), nextPageToken",
        orderBy: "createdTime",
      });

      const { nextPageToken, drives } = res.data;
      sharedDrives = [...sharedDrives, ...drives];
      token = nextPageToken;
    } while (token);
    {
      return Response.json(sharedDrives);
    }
  } catch (err) {
    console.error(err.message);
  }
};
