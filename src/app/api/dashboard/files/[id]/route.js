import { getDriveAccess } from "@/lib/gdrive";

const getDrive = async (drive, driveId) => {
    try {
        const res = await drive.drives.get({
            driveId: driveId,
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        })
    
        console.log(res.data);
        return Response.json(res.data)
    } catch (err) {
        console.error(err.message);
    }
}

export const GET = async (req, res) => {
    const drive = await getDriveAccess(req, res)
    const fileId = res.params.id
    console.log(fileId);

    try {
        const res = await drive.files.get({
            fileId: fileId,
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
        })

        const {id, driveId} = res.data

        if (id === driveId) {
            return getDrive(drive, driveId)
        }

        console.log(res.data);
        return Response.json(res.data)
    } catch (err) {
        console.error(err.message);
    }
}