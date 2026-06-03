import type {
    User,
    GroupClub,
    GroupInte,
    Proof,
    Challenge,
    Location
} from '@prisma/client';

export type {
    Challenge
}

// Type GroupLeaderboard utilisé pour l'affichage du classement
export type GroupLeaderboard = Pick<GroupInte, "name", "pictureURL", "points"> | null;

// Type Challenge Read utilisé uniquement pour l'affichage UI du challenge
export type ChallengeRead = Pick<Challenge, "name", "description", "groupInteSucceed", "type", "nbPoints", "locationName", "challengeId">;

// Type Group Challenge réunit les ChallengeRead dans des groupes
export type GroupChallenge = Pick<GroupClub, "name", "pictureURL"> & {challenges: ChallengeRead[]};
