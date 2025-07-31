import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth/next";

/*
ini alah route api untuk next auth
jangan di sentuh yah
*/

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };