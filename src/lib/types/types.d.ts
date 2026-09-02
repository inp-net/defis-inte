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
export type ProofRead = Pick< Proof, "proofId" | "type" | "content" | "date" | "status" | "validatorId" | "comment" >
    & { user: Pick<User, "firstName" | "lastName">; challenge: Pick<Challenge, "name" | "nbPoints"> | null; groupInte: Pick<GroupInte, "name"> };

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
export type ChallengeRead = Pick<
    Challenge, "challengeId" | "name" | "description" | "type" | "nbPoints" | "locationName" | "defiAccepte" | "isDeleted"
> & { 
    groupName: string; 
    groupUrl: string | null; 
} & { 
    userName?: string; 
} & { 
    allSucceedGroupNames: string[];
} & { 
    isDone?: boolean; 
    isPending?: boolean; 
};

// Type Group Challenge réunit les ChallengeRead dans des groupes
export type GroupChallenge = Pick<GroupClub, "name" | "pictureURL"> & { challenges: ChallengeRead[] };
