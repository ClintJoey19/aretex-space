import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

export const gdriveConfig = async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    const token = await getToken({ req });
    console.log(token);

    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URI = "http://localhost:3000/api/auth/callback/google";

    const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );

    if (!session) {
      res.status(401).json({ error: "No Session Active" });
    }

    const accessToken = session?.accessToken;
    const refreshToken = session?.refreshToken;

    if (!accessToken) {
      res.status(401).json({ error: "No access token" });
    }

    oAuth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (oAuth2Client.isTokenExpiring()) {
      const { tokens } = await oAuth2Client.refreshAccessToken();
      const newAccessToken = tokens.access_token;

      session.user.accessToken = newAccessToken;
    }

    const drive = google.drive({
      version: "v3",
      auth: oAuth2Client,
    });

    return drive;
  } catch (err) {
    console.log(err.message);
    throw new Error(err.message);
  }
};
