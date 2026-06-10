import type {
    User,
    GroupClub,
    GroupInte,
    Proof,
    Challenge,
    Location,
    UploadType,
} from '../../../prisma/generated/prisma/client';

export type {
    Challenge,
    Proof,
    UploadType,
}

type Category = {
    key: String;
    valeurs: String[];
}

// Input pour crée une preuve
export interface ProofInput {
    challengeId: number;
    userId: string;
    type: UploadType;
    content: String[];
}

export enum Status {
  PENDING = 'PENDING',
  VALID = 'VALID',
  DENIED = 'DENIED'
}

// Type GroupLeaderboard utilisé pour l'affichage du classement
export type GroupLeaderboard = Pick<GroupInte, "name", "pictureURL", "points"> | null;
export type UserLeaderboard = Pick<User, "name", "points", "profilePictureURL"> | null;
export type Leaderboard = {
    name: string,
    pictureURL?: string
    points: number,
}

// Type Challenge Read utilisé uniquement pour l'affichage UI du challenge
export type ChallengeRead = Pick<
    Challenge, "challengeId" | "name" | "description" | "type" | "nbPoints" | "locationName" | "defiAccepte" | "isDeleted"
> & { groupName: string; groupUrl: string | null; }

export type ChallengeInput = {
    name: string;
    description: string | null;
    groupId: string;
    type: UploadType;
    nbPoints: number;
    locationName: string;
};

export type ProofRead = Pick<Proof, "proofId", "user", "challenge", "status", "type", "content", "date", "media", "text">;

// Type Group Challenge réunit les ChallengeRead dans des groupes
export type GroupChallenge = Pick<GroupClub, "name", "pictureURL"> & {challenges: ChallengeRead[]};
