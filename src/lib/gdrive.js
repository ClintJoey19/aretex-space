import { getToken } from "next-auth/jwt";
import { google } from "googleapis";

export async function getDriveAccess(req, res) {
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

    return drive;
  } catch (err) {
    console.log(err.message);
    return { message: err.message };
  }
}

export const getMembers = async (drive, fileId) => {
  try {
    const response = await drive.permissions.list({
      fileId: fileId,
      fields: "permissions(id, emailAddress, role)",
      supportsAllDrives: true,
    });

    const members = response.data.permissions.map((permission) => ({
      id: permission.id,
      emailAddress: permission.emailAddress,
      role: permission.role,
    }));

    return members;
  } catch (err) {
    console.log(err.message);
  }
};
