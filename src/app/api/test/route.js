import { google } from "googleapis";
import { getSession } from "next-auth/react"; // trying next-auth/client
// import { getServerSession } from "next-auth";

async function handler(req, res) {
  const result = await handleGet(req, res);

  if (result) {
    return Response.json(JSON.stringify(result));
  }

  return Response.json("Failed");
}

async function handleGet(req, res) {
  try {
    const session = await getSession({ req });
    console.log(session);
  } catch (err) {
    console.log(err.message);
  }
}

export { handler as GET, handler as POST };
