// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    token: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
    token: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    token: string;
    error?: string;
  }
}