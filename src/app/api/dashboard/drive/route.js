import { getDriveAccess } from "@/lib/gdrive";
import { formatBytes } from "@/lib/utils";

export const GET = async (req, res) => {
  const drive = await getDriveAccess(req, res);

  try {
    const res = await drive.about.get({
      fields: "storageQuota",
    });
    const {limit, usage, usageInDrive, usageInDriveTrash} = res.data.storageQuota;

    return Response.json([Number(limit), Number(usage), Number(usageInDrive), Number(usageInDriveTrash)]);
  } catch (err) {
    console.error(err.message);
  }
};
