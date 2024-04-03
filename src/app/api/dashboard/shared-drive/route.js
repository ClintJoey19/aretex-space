import { getDriveAccess, getMembers } from "@/lib/gdrive";

export const GET = async (req, res) => {
  const drive = await getDriveAccess(req, res);
  const result = await getSharedDrives(drive);

  if (result) {
    return Response.json({ result });
  }

  return "Something went wrong";
};

const getSharedDrives = async (drive) => {
  let sharedDrives = [];
  let nextPageToken = null;

  try {
    do {
      const response = await drive.drives.list({
        pageToken: nextPageToken,
        pageSize: 20,
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

      sharedDrives = sharedDrives.concat(await Promise.all(fetched));
      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);

    console.log({ drives: sharedDrives.length });
    return sharedDrives;
  } catch (err) {
    console.log(err.message);
    throw new Error("Failed to fetch shared drives");
  }
};
