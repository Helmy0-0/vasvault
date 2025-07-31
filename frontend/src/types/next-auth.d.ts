// types/next-auth.d.ts
import NextAuth from "next-auth";
/**
 * This file is used to extend the NextAuth types for TypeScript.
 * It allows to add custom properties to the User and Session interfaces.
 */

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
        token: string;
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