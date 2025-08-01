import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "wignn" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/auth/login`, {
              email: credentials.email,
              password: credentials.password,
            }
          );

          // Check if response is successful and has data
          if (response.data && response.status === 200) {
            const userData = response.data;
            
            // Return user object with all necessary data
            return {
              id: userData.id.toString(), 
              email: userData.email,
              name: userData.name,
              token: userData.token,
            };
          }

          return null;
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign",
  },
  callbacks: {
    async jwt({ token, user }) {
      // If this is the first time JWT callback is called (user login)
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          name: user.name,
          token: user.token,
        };
      }

      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          name: token.name,
          token: token.token,
        },
        error: token.error,
      };
    },
  },
  session: {
    strategy: "jwt", 
  },
  // This is secret for the next auth
  secret: process.env.NEXTAUTH_SECRET,
};