import { handler } from "@/app/api/auth/[...nextauth]/route";

export const authConfig = {
  pages: {
    signIn: "/",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      console.log(auth);
      return false;
    },
  },
};
