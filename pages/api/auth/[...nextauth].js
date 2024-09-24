// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/login', // Redirect to custom login page
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for encrypting session tokens
  session: {
    strategy: "jwt", // Use JWT for session handling
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Assuming you want to store user ID in the token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Attach user ID to session
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to home page after successful authentication
      return baseUrl; // or '/'; depending on your needs
    },
  },
});
