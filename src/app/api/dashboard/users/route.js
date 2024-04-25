import { getUsers } from "@/lib/data";

export async function GET(req, res) {
  try {
    const result = await getUsers();

    if (result) {
      return Response.json(result);
    }

    return { error: "Something went wrong" };
  } catch (err) {
    console.log(err.message);
    throw new Error("Failed to fetch users");
  }
}
