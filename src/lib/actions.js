import { google } from "googleapis";
import { getToken } from "next-auth/jwt";
import { IncomingMessage } from "http";

export async function getDrive(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(token);
  } catch (err) {
    console.error(err.message);
  }
}
