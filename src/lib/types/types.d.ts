import type { LucideIcon } from '@lucide/svelte';

import type {
    User,
    GroupClub,
    GroupInte,
    Proof,
    Challenge,
    Location,
} from '../../../prisma/generated/prisma/client';

export type {
    GroupClub, Location
}

export enum Status {
    PENDING = 'PENDING',
    VALID = 'VALID',
    DENIED = 'DENIED'
}

import type { UploadType as PrismaUploadType } from '../../../prisma/generated/prisma/client';

export type UploadType = PrismaUploadType;
export const UploadType = {
    PHOTO: "PHOTO",
    VIDEO: "VIDEO",
    TEXT: "TEXT"
} as const;

// cette primitive sert à rendre les ChallengeCard
export type ListPrimitive = {
    text: string,
    description?: string | null,
    id: number,
    url?: string,
    alt?: string,
    points: number
}

export type UserChurros = {
    uid: string;
    firstName: string;
    lastName: string;
    pictureURL: string;
    churrosGroups: ChurrosGroups[];
    yearTier: number;
};

export type ChurrosGroups = {
    group: ClubInfo;
    secretary: boolean;
    president: boolean;
    vicePresident: boolean;
    treasurer: boolean;
};

export type ClubInfo = {
    uid: string;
};

export type {
    Challenge,
    Proof,
    User
}

// Input pour crée une preuve
export type ProofInput = {
    challengeId: number;
    userId: string;
    type: UploadType;
    content: String[];
    isOkTVn7: boolean;
}

// Pour lire les preuves, informations utiles
export type RawProof = Pick<
    Proof,
    "proofId" | "type" | "content" | "date" | "status" | "validatorId" | "comment"
> & {
    user: Pick<User, "firstName" | "lastName" | "profilePictureURL"> & {
        groupInte?: Pick<GroupInte, "name", "pictureURL"> | null;
    };
    challenge: (Pick<Challenge, "name" | "nbPoints" | "description"> & {
        group?: Pick<GroupClub, "name" | "pictureURL"> | null;
    }) | null;
    isOkTVn7?: boolean;
};

export type ProofRead = RawProof & ListPrimitive;

// Input pour crée un challenge
export type ChallengeInput = {
    userId?: string | null;
    challengeId?: string | number | null;
    name: string;
    description?: string | null;
    groupName: string;
    locationName: string;
    type?: string | null;
    nbPoints?: string | number | null;
}

// Type GroupLeaderboard utilisé pour l'affichage du classement
export type GroupLeaderboard = Pick<GroupInte, "name" | "pictureURL" | "points"> | null;
export type UserLeaderboard = Pick<User, "firstName" | "lastName" | "points" | "profilePictureURL"> | null;
export type Leaderboard = {
    name: string;
    pictureURL?: string | null;
    points: number;
    groupName?: string | null;
};

// Type Challenge Read utilisé uniquement pour l'affichage UI du challenge
export type RawChallenge = Pick<
    Challenge,
    "challengeId" | "name" | "description" | "type" | "nbPoints" | "locationName" | "defiAccepte" | "isDeleted"
> & {
    groupName: string;
    groupUrl: string | null;
    userName?: string;
    allSucceedGroupNames: string[];
    isDone?: boolean;
    isPending?: boolean;
};

export type ChallengeRead = RawChallenge & ListPrimitive;

// Type Group Challenge réunit les ChallengeRead dans des groupes
export type GroupChallenge = Pick<GroupClub, "name" | "pictureURL"> & { challenges: ChallengeRead[] };

export const CHALLENGE_PER_PAGE = 25;

export type MetadataCard = { name: string, icon: LucideIcon, values: string[] };
