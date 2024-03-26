import { User } from "@/lib/models";
import { connect } from "mongoose";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

const GOOGLE_ID = process.env.CLIENT_ID
const GOOGLE_SECRET = process.env.CLIENT_SECRET

const authOptions = {
  session: {
    strategy: 'jwt'
  },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_ID,
            clientSecret: GOOGLE_SECRET,
            authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth?hd=aretex.com.au",
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code",
                  scope: "openid email profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file"
                }
              },
        })
    ],
    callbacks: {
      async signIn({user, account, profile}) {
        console.log(user, account, profile);
        if (account.provider === "google") {
          connect()
          try {
            const user = await User.findOne({email: profile.email})

            if (!user) {
              const newUser = new User({
                username: profile.name,
                email: profile.email,
                img: profile.picture
              })

              await newUser.save()
            }
          } catch (err) {
            console.log(err.message);
            return false
          }
        }
        return true
      },
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token
          token.refreshToken = account.refresh_token
        }
        return token
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
        return session
      }
    }
}

export const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}