import { getDriveTemplates } from "@/lib/data";

export const GET = async (req, res) => {
  try {
    const templates = await getDriveTemplates();

    return Response.json(templates);
  } catch (err) {
    console.error(err.message);
  }
};
