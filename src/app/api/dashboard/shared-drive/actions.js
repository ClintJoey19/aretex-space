import {v4 as uuid} from "uuid"

export const createDrive = async (drive, drives) => {
    for (const driveName of drives) {
        try {
            const res = await drive.drives.create({
                resource: {
                    name: driveName
                },
                requestId: uuid(),
                fields: 'id'
            })

            return res
        } catch (err) {
            console.error(err.message);
        }
    }
}