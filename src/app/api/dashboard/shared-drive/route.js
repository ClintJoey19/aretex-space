import { getDriveAccess, getMembers } from "@/lib/gdrive";

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
      fields: "drives(id, name, capabilities, createdTime), nextPageToken",
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

export const POST = async (req, res) => {
  const drive = await getDriveAccess(req, res);
  console.log();

  const newDrive = await Request.json();
};
