import { SvelteKitAuth } from '@auth/sveltekit';
import Authentik, { type AuthentikProfile } from '@auth/sveltekit/providers/authentik';
import Credentials from '@auth/sveltekit/providers/credentials';
import type { Profile, Session } from '@auth/core/types';
import type { UserChurros } from '$lib/types/types.d';
import { userChurrosToPrisma } from './prisma';
import { env as privatEnv } from '$env/dynamic/private';
import { env } from '$env/dynamic/public';
import type { CredentialInput, CredentialsConfig, OAuthConfig } from '@auth/core/providers';
import { prisma } from '$lib/server/prisma';

const BETTER_AUTH_SECRET : string = privatEnv.BETTER_AUTH_SECRET ; 
const AUTH_AUTHENTIK_SECRET : string = privatEnv.AUTH_AUTHENTIK_SECRET ;
const AUTH_AUTHENTIK_ID : string = privatEnv.AUTH_AUTHENTIK_ID ;
const PUBLIC_AUTH_AUTHENTIK_ISSUER : string = env.PUBLIC_AUTH_AUTHENTIK_ISSUER ;


// GESTION DE L'AUTHENTIFICATION

type Provider = OAuthConfig<AuthentikProfile> | CredentialsConfig<Record<string, CredentialInput>>;

const providers: Provider[] = [
    Authentik({
        clientId: AUTH_AUTHENTIK_ID,
        issuer: PUBLIC_AUTH_AUTHENTIK_ISSUER,
        clientSecret: AUTH_AUTHENTIK_SECRET,
        authorization: { params: { scope: 'churros:profile' } }
    }),
];

// Connexion
export const { handle, signIn, signOut } = SvelteKitAuth({
    secret: BETTER_AUTH_SECRET,
    providers,
    session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,  // durée du token en secondes (ici 2 heures)
    updateAge: 1 * 60 * 60,   // durée de mise à jour du token en secondes (ici 24 heures)
  },
    trustHost: true,
    logger: {
        error: (code, ...message) => {
            console.error('[Auth Error]', code, ...message);
        },
        warn: (code, ...message) => {
            console.warn('[Auth Warn]', code, ...message);
        },
    },
    callbacks: {
        async signIn({ profile, user, account }) {

            if (profile) {
                const { iss, sub, aud, exp, iat, auth_time, jti, acr, amr, sid, ...user } = profile;
                if (!await userChurrosToPrisma(user as UserChurros)) {
                    //Si la conversion marche pas on refuse la connexion
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, profile, user, account }: { token: Record<string, unknown>; profile?: Profile | null; user?: { id?: string | null }; account?: { provider?: string } | null }) {

            if (profile) {
                const churrosProfile = profile as UserChurros;
                token.uid = (profile as UserChurros).uid;
                token.firstName = churrosProfile.firstName;
                token.lastName = churrosProfile.lastName;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: Record<string, unknown> }) {
            session.uid = token.uid as string;
            const droitUser = await prisma.user.findUnique({
                where: {
                    id: session.uid
                },
                select: {
                    is1A: true
                }
            });
            session.is1A = droitUser?.is1A ?? false;
            return session;
        }
    }
});
