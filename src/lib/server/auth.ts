import { SvelteKitAuth } from '@auth/sveltekit';
import Authentik, { type AuthentikProfile } from '@auth/sveltekit/providers/authentik';
import Credentials from '@auth/sveltekit/providers/credentials';
import { env as privatEnv } from '$env/dynamic/private';
import { env } from '$env/dynamic/public';

// Composants internes et types
import { prisma } from '$lib/server/prisma';
import { userChurrosToPrisma } from './prisma';
import type { Session } from '@auth/core/types';
import type { CredentialInput, CredentialsConfig, OAuthConfig } from '@auth/core/providers';
import type { UserChurros } from '$lib/types/types.d';

// Variables d'environnements
const BETTER_AUTH_SECRET: string = privatEnv.BETTER_AUTH_SECRET;
const AUTH_AUTHENTIK_SECRET: string = privatEnv.AUTH_AUTHENTIK_SECRET;
const AUTH_AUTHENTIK_ID: string = privatEnv.AUTH_AUTHENTIK_ID;
const PUBLIC_AUTH_AUTHENTIK_ISSUER: string = env.PUBLIC_AUTH_AUTHENTIK_ISSUER;
const ENABLE_MOCK_AUTH: boolean = privatEnv.ENABLE_MOCK_AUTH === 'true';


//
// Authentification
//

type Provider = OAuthConfig<AuthentikProfile> | CredentialsConfig<Record<string, CredentialInput>>;
const providers: Provider[] = [];

if (ENABLE_MOCK_AUTH) {
    //
    // Mode Fake User sans Authentik
    //
    providers.push(
        Credentials({
            id: "authentik",
            name: "Mock Account",
            credentials: {},
            async authorize() {
                // Utilisateur fake crée
                const mockProfile: UserChurros = {
                    uid: "fake-user-id-2",
                    firstName: "Fake Fake Fake",
                    lastName: "User",
                    pictureURL: "https://picsum.photos/200",
                    groupInteId: "groupe-10-2026",
                    yearTier: 1,
                    churrosGroups: [
                        // {
                        //     // Ajouter les faux groupes ici
                        //     // group: { groupId: "bde", name: "BDE", ... },
                        // }
                    ],
                };

                await userChurrosToPrisma(mockProfile);
                return { id: mockProfile.uid, ...mockProfile };
            }
        })
    );
} else {
    providers.push(
        Authentik({
            clientId: AUTH_AUTHENTIK_ID,
            issuer: PUBLIC_AUTH_AUTHENTIK_ISSUER,
            clientSecret: AUTH_AUTHENTIK_SECRET,
            authorization: { params: { scope: 'churros:profile' } }
        })
    );
}

//
// Sveltekit Authentification
//

export const { handle, signIn, signOut } = SvelteKitAuth({
    secret: BETTER_AUTH_SECRET,
    providers,
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
        updateAge: 1 * 60 * 60,
    },
    trustHost: true,
    logger: {
        error: (code, ...message) => { console.error('[Auth Error]', code, ...message); },
        warn: (code, ...message) => { console.warn('[Auth Warn]', code, ...message); },
    },
    callbacks: {
        async signIn({ profile, account }) {
            // si c'est le mock
            if (account?.provider === 'credentials') {
                return true; 
            }
            // Si c'est Authentik
            if (profile) {
                const { iss, sub, aud, exp, iat, auth_time, jti, acr, amr, sid, ...user } = profile;
                const success = await userChurrosToPrisma(user as UserChurros);
                if (!success) return false;
            }
            return true;
        },

        async jwt({ token, profile, user, account }) {
            if (profile) {
                const churrosProfile = profile as UserChurros;
                token.uid = churrosProfile.uid;
                token.firstName = churrosProfile.firstName;
                token.lastName = churrosProfile.lastName;
            } 
            else if (account?.provider === 'credentials' && user) {
                const mockUser = user as unknown as UserChurros;
                token.uid = mockUser.uid ?? user.id;
                token.firstName = mockUser.firstName;
                token.lastName = mockUser.lastName;
            }
            
            if (!token.uid && user?.id) {
                token.uid = user.id;
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
