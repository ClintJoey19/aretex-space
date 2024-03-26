import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

const GOOGLE_ID = process.env.CLIENT_ID
const GOOGLE_SECRET = process.env.CLIENT_SECRET

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              },
              scope: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/drive",
                "https://www.googleapis.com/auth/drive.file"
              ],
              include_granted_scopes: true
        })
    ]
}

export const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}