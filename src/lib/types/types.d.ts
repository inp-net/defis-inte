import type {
    User,
    GroupClub,
    GroupInte,
    Proof,
    Challenge,
    Location
} from '@prisma/client';

export type GroupLeaderboard = Pick<GroupInte, "name", "pictureURL", "points"> | null;
