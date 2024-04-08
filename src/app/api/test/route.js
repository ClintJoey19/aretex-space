import { getToken } from "next-auth/jwt";

const handler = async (req, res) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log(res);

  return res.json({ token });
};

export { handler as GET, handler as POST };
