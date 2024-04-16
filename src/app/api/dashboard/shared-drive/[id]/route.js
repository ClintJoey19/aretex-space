import { getDriveAccess } from "@/lib/gdrive";

export const GET = async (req, res) => {
    const drive = await getDriveAccess(req, res)
    const driveId = res.params.id
    const url = new URL(req.url)
    console.log(url.searchParams.get("token"));

    try {
        const res = await drive.files.list({
            corpora: "drive",
            driveId: driveId,
            includeItemsFromAllDrives: true,
            supportsAllDrives: true,
            trashed: false,
            fields: "files(id, name, mimeType, parents)"
        })

        const filtered = res.data.files.filter((file) => file.parents.includes(driveId))
        const sorted = filtered.sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase()
            return nameA.localeCompare(nameB)
        })

        return Response.json(sorted)
    } catch (err) {
        console.error(err.message);
    }
}