import { getDriveAccess } from "@/lib/gdrive";

export const GET = async (req, res) => {
    const drive = await getDriveAccess(req, res)

    return Response.json({message: "Hello"})
}

/*
Roles
    reader - Reader
    commenter - Commenter
    writer - Contributor
    fileOrganizer - Content Manager
    organizer - Manager
*/
export const POST = async (req, res) => {
    const drive = await getDriveAccess(req, res)
    const data = await req.json()

    try {
        const res = await drive.permissions.create({
            fileId: data.driveId,
            requestBody: {
                role: data.role,
                type: "user",
                emailAddress: data.email
            },
            sendNotificationEmail: false,
            userDomainAccess: true,
            supportsAllDrives: true
        })
        console.log(`${data.email} is added to ${data.driveId}`);
    
        return Response.json(res)
    } catch (err) {
        console.error(err.status);
        return Response.json({ error: err.message }, {status: err.status});
    }
}

export const PATCH = async (req, res) => {
    const drive = await getDriveAccess(req, res)
}

export const DELETE = async (req, res) => {
    const drive = await getDriveAccess(req, res)
}