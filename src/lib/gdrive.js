import { getToken } from "next-auth/jwt";
import { google } from "googleapis";

export async function getDriveAccess(req, res) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      res.status(404);
    }

    const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
    const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
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
    console.log(err);
  }
}

export const getSharedDrives = async (token, page) => {
  const res = await fetch("https://www.googleapis.com/drive/v3/drives", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      pageSize: 10,
      fields: "drives(id, name, capabilities)",
      useDomainAdminAccess: true,
      q: "trashed=false",
      orderBy: "createdTime",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to get shared drives: ${res.statusText}`);
  }

  const { nextPageToken, drives } = await res.json();

  return { nextPageToken, drives };
};

export const getAllDrives = async (token) => {
  let drives = [];
  let nextPageToken = null;

  try {
    const res = await fetch("https://www.googleapis.com/drive/v3/drives", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      params: {
        pageSize: 10,
        pageToken: nextPageToken,
        fields: "drives(id, name, capabilities)",
        useDomainAdminAccess: true,
        q: "trashed=false",
        orderBy: "createdTime",
      },
    });

    const data = await res.json();
    console.log(data);

    drives = [...drives, data.drives];

    return JSON.parse(JSON.stringify(drives));
  } catch (err) {
    console.error(err.message);
  }
};

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
