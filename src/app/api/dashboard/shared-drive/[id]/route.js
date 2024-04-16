import { getDriveAccess } from "@/lib/gdrive";

export const GET = async (req, res) => {
  const drive = await getDriveAccess(req, res);
  const id = res.params.id;

  try {
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

    return Response.json(sorted);
  } catch (err) {
    console.error(err.message);
  }
};
