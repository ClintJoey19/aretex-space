import { connect } from "@/lib/connection";
import { model, models, Schema } from "mongoose";

const driveTemplateSchema =
  models?.DriveTemplates || model("DriveTemplates", new Schema({}));

export const GET = async (req, res) => {
  try {
    connect();
    //pending
    // fetch all the templates
  } catch (err) {
    console.error(err.message);
  }
};

export const POST = async (req, res) => {
  try {
    connect();
    const data = await req.json();
    // const savedData = await driveTemplateSchema.create(data);
    // console.log(savedData);

    return Response.json({
      message: `${JSON.parse(data)}`,
    });
    // return Response.json({
    //   message: `${data.name} template is added to drive`,
    // });
  } catch (err) {
    console.error(err.message);
    return Response.json({ error: err.message }, { status: err.status });
  }
};
