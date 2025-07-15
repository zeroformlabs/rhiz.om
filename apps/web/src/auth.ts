import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@rhiz.om/db";
import logger from '@rhiz.om/shared/utils/logger';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  events: {
    signIn: ({ user }) => {
      logger.info(`User signed in: ${user.email}`);
    },
    signOut: async (message) => {
      if ('session' in message && message.session) {
        const user = await prisma.user.findUnique({
          where: { id: message.session.userId },
        });
        if (user) {
          logger.info(`User signed out: ${user.email}`);
        }
      } else if ('token' in message && message.token?.email) {
        logger.info(`User signed out: ${message.token.email}`);
      }
    },
    createUser: async ({ user }) => {
      if (!user.id || !user.email) {
        logger.error('User in createUser event is missing id or email.', { user });
        return;
      }
      logger.info(`A new user was created: ${user.email}`);

      await prisma.$transaction(async (tx) => {
        // Step 1: Create the Being for the user, now without needing an owner initially.
        const userBeing = await tx.being.create({
          data: {
            name: user.name || "New User",
            type: "USER",
            user: { connect: { id: user.id } },
          },
        });

        // Step 2: Now that the Being exists, update it to own itself.
        const selfReferencedBeing = await tx.being.update({
          where: { id: userBeing.id },
          data: {
            owner: { connect: { id: userBeing.id } },
          },
        });

        // Step 3: Create the user's personal Space, owned by their Being.
        const userSpace = await tx.being.create({
          data: {
            name: `${selfReferencedBeing.name}'s Space`,
            type: "SPACE",
            owner: { connect: { id: selfReferencedBeing.id } },
            // The space is located within itself initially.
            location: { connect: { id: selfReferencedBeing.id } },
          },
        });
        
        // Step 4: Update the user's Being to be located in their new Space.
        await tx.being.update({
            where: { id: selfReferencedBeing.id },
            data: {
                location: { connect: { id: userSpace.id } },
            },
        });

        logger.info(`Onboarding complete for ${user.email}. Created Being ID: ${selfReferencedBeing.id} and Space ID: ${userSpace.id}`);
      });
    },
  },
  ...authConfig,
});

export const runtime = 'nodejs';