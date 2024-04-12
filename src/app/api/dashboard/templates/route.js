import { connect } from "@/lib/connection";

export const GET = async (req, res) => {
    try {
        connect()
        //pending
        // fetch all the templates
    } catch (err) {
        console.error(err.message);
    }
}

export const POST = async (req, res) => {
    try {
        connect()
        const data = await req.json()

        console.log(data);
        // await newDriveTemplate.save()

        return Response.json({message: "Template added to drive"})
    } catch (err) {
        console.error(err.message);
    }
}   