import type {
    User,
    GroupClub,
    GroupInte,
    Proof,
    Challenge,
    Location,
    UploadType,
} from '../../../prisma/generated/prisma/client';

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
    UploadType,
    User
}

type Category = {
    key: String;
    valeurs: String[];
}

// Input pour crée une preuve
export type ProofInput = {
    challengeId: number;
    userId: string;
    type: UploadType;
    content: String[];
    isOkTVn7: boolean;
}

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

export enum Status {
  PENDING = 'PENDING',
  VALID = 'VALID',
  DENIED = 'DENIED'
}

// Type GroupLeaderboard utilisé pour l'affichage du classement
export type GroupLeaderboard = Pick<GroupInte, "name" | "pictureURL" | "points"> | null;
export type UserLeaderboard = Pick<User, "firstName" | "lastName" | "points" | "profilePictureURL"> | null;
export type Leaderboard = {
    name: string,
    pictureURL?: string
    points: number,
}

// Type Challenge Read utilisé uniquement pour l'affichage UI du challenge
export type ChallengeRead = Pick<
    Challenge, "challengeId" | "name" | "description" | "type" | "nbPoints" | "locationName" | "defiAccepte" | "isDeleted"
> & { groupName: string; groupUrl: string | null; } & { userName: string } & { groupInteSuccedName: string[] }

export type ProofRead = Pick<Proof, "proofId" | "userId" | "challengeId" | "status" | "type" | "content" | "date" >;

// Type Group Challenge réunit les ChallengeRead dans des groupes
export type GroupChallenge = Pick<GroupClub, "name" | "pictureURL"> & { challenges: ChallengeRead[] };
