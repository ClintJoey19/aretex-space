import { connect } from "@/lib/connection";
import { DriveTemplateSchema } from "@/lib/models";

export const POST = async (req, res) => {
    try {
        connect()
        const newDriveTemplate = new DriveTemplateSchema({
            name: "Financial Template",
            template: {
                name: "Drive",
                mimeType: "drive",
                children: [
                    {
                        name: "Folder 1",
                        mimeType: "drive",
                        children: []
                    },
                    {
                        name: "Folder 2",
                        mimeType: "drive",
                        children: []
                    },
                ]
            }
        })

        console.log(newDriveTemplate);
        // await newDriveTemplate.save()

        return Response.json({message: "Template added to drive"})
    } catch (err) {
        console.error(err.message);
    }
}   