import type {
    User,
    GroupClub,
    GroupInte,
    Proof,
    Challenge,
    Location,
    UploadType
} from '../../../prisma/generated/prisma/client';

export type {
    Challenge
}

// Type GroupLeaderboard utilisé pour l'affichage du classement
export type GroupLeaderboard = Pick<GroupInte, "name", "pictureURL", "points"> | null;

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
