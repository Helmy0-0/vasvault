import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "name", type: "text", placeholder: "wignn" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.name || !credentials?.password) {
          return null;
        }

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
            {
              name: credentials.name,
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

      // Access token has expired, try to update it
      // Uncomment this if you have refresh token functionality
      // return await refreshAccessToken(token);
      
      // For now, return token as is (user will need to login again)
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
    strategy: "jwt", // Make sure to use JWT strategy
  },
  // This is secret for the next auth
  secret: process.env.NEXTAUTH_SECRET,
};