import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';
import { adminHashProblem, isAdminConfigured } from './lib/admin/config';

/**
 * Single-user credentials auth.
 *
 * There is exactly one account — the ADMIN_EMAIL / ADMIN_PASSWORD_HASH pair
 * from the environment. No signup route, no user table, no password reset.
 * Both checks run even when the email is wrong so the comparison takes the
 * same time either way.
 */

const DUMMY_HASH = '$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidin';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!isAdminConfigured()) return null;

        const hashProblem = adminHashProblem();
        if (hashProblem) {
          console.error(`[auth] ${hashProblem}`);
          return null;
        }

        const email = String(credentials?.email ?? '').trim().toLowerCase();
        const password = String(credentials?.password ?? '');

        if (!email || !password) return null;

        const expectedEmail = process.env.ADMIN_EMAIL!.trim().toLowerCase();
        const expectedHash = process.env.ADMIN_PASSWORD_HASH!;

        const emailMatches = email === expectedEmail;

        // Always run a comparison to keep timing constant.
        const passwordMatches = await bcrypt.compare(
          password,
          emailMatches ? expectedHash : DUMMY_HASH,
        );

        if (!emailMatches || !passwordMatches) return null;

        return { id: 'admin', email: expectedEmail, name: 'DiMaac Admin' };
      },
    }),
  ],
});
