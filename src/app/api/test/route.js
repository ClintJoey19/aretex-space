import { google } from "googleapis";
// import { getSession } from "next-auth/react"; // trying next-auth/client
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getToken } from "next-auth/jwt";

async function handler(req, res) {
  const result = await handleGet(req, res);

  if (result) {
    return Response.json(JSON.stringify(result));
  }

  return Response.json("Failed");
}

async function handleGet(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      res.status(404);
    }

    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const accesToken = token.accessToken;
    const refreshToken = token.refreshToken;

    const auth = new google.auth.OAuth2({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    });

    auth.setCredentials({
      access_token: accesToken,
      refresh_token: refreshToken,
    });

    const drive = google.drive({
      version: "v3",
      auth: auth,
    });

    let files = [];
    const response = await drive.files.list({
      fields: "files(id, name)",
    });

    files = response.data.files;
    console.log(files);
    return files;
  } catch (err) {
    console.log(err.message);
    return { message: err.message };
  }
}

export { handler as GET, handler as POST };
