import { getDriveAccess } from "@/lib/gdrive";
import { formatBytes } from "@/lib/utils";

export const GET = async (req, res) => {
  const drive = await getDriveAccess(req, res);

  try {
    const res = await drive.about.get({
      fields: "storageQuota",
    });
    const storage = res.data.storageQuota;
    console.log(formatBytes(storage.usageInDriveTrash));

    return Response.json(res.data);
  } catch (err) {
    console.error(err.message);
  }
};
