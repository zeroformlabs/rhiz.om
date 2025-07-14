import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import logger from '@rhiz.om/shared/utils/logger';

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID as string,
      clientSecret: process.env.APPLE_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  events: {
    signIn: ({ user }) => {
      logger.info(`User signed in: ${user.email}`);
    },
    signOut: ({ token }) => {
      logger.info(`User signed out: ${token.email}`);
    },
    createUser: ({ user }) => {
      logger.info(`User created: ${user.email}`);
    },
    linkAccount: ({ user }) => {
      logger.info(`Account linked: ${user.email}`);
    },
    session: ({ session }) => {
      logger.info(`Session created for user: ${session.user?.email}`);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export const runtime = 'nodejs';
