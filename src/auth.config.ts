import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-safe half of the auth config.
 *
 * Middleware runs on the edge runtime, which can't run bcrypt — so the
 * Credentials provider (and its hash comparison) lives in src/auth.ts and is
 * only loaded by the Node-runtime route handler. This file holds everything
 * middleware needs to read an existing session.
 */
export const authConfig = {
  providers: [],
  session: { strategy: 'jwt', maxAge: 60 * 60 * 12 },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  trustHost: true,
  callbacks: {
    jwt({ token, user }) {
      if (user) token.email = user.email;
      return token;
    },
    session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
