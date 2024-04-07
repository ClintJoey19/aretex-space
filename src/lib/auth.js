import { User } from "@/lib/models";
import { connect } from "@/lib/connection";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_ID = process.env.CLIENT_ID;
const GOOGLE_SECRET = process.env.CLIENT_SECRET;

export const authOptions = {
  session: {
    jwt: true,
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          scope:
            "openid email profile https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      // console.log(user, account, profile);
      if (account.provider === "google") {
        connect();
        try {
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = new User({
              username: profile.name,
              email: profile.email,
              img: profile.picture,
            });

            await newUser.save();
          }
        } catch (err) {
          console.log(err.message);
          return false;
        }
      }
      return true;
    },
  },
};

export const handler = NextAuth(authOptions);
