import {v4 as uuid} from "uuid"

const folders = [
    "Desktop Procedure",
    "Onboarding & Communication",
    "Financial",
    "AP",
    "DMS ADMIN SUPP",
    "DMS FIN SUPPORT"
]

export const uploadFolder = async (file, destinationId) => {
    const metadata = {
        name: file,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [destinationId]
    }

    try {
        await drive.files.create({
            requestBody: metadata,
            requestId: uuid.v4(),
            fields: 'id',
            supportsAllDrives: true
        })
        console.log(`${file} is added to ${destinationId}`);
    } catch (err) {
        console.error(err);
    }
}