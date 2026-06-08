-- CreateEnum
CREATE TYPE "UploadType" AS ENUM ('photo', 'video', 'text');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'valid', 'denied');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('easy', 'medium', 'hard', 'impossible');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is1A" BOOLEAN NOT NULL,
    "groupInteId" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupClub" (
    "groupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pictureURL" TEXT,

    CONSTRAINT "GroupClub_pkey" PRIMARY KEY ("groupId")
);

-- CreateTable
CREATE TABLE "GroupInte" (
    "groupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pictureURL" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GroupInte_pkey" PRIMARY KEY ("groupId")
);

-- CreateTable
CREATE TABLE "Proof" (
    "proofId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" "UploadType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "media" TEXT,
    "text" TEXT,
    "challengeId" TEXT,
    "validatorId" TEXT,
    "status" "Status" NOT NULL,

    CONSTRAINT "Proof_pkey" PRIMARY KEY ("proofId")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "challengeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userAcceptId" TEXT NOT NULL,
    "defiAccepte" BOOLEAN NOT NULL DEFAULT false,
    "type" "UploadType" NOT NULL,
    "nbPoints" INTEGER NOT NULL DEFAULT 0,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'easy',
    "locationName" TEXT NOT NULL DEFAULT 'ENSEEIHT',

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("challengeId")
);

-- CreateTable
CREATE TABLE "Location" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "_UserGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserGroups_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BoardGroups" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BoardGroups_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ChallengesSucceed" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ChallengesSucceed_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserGroups_B_index" ON "_UserGroups"("B");

-- CreateIndex
CREATE INDEX "_BoardGroups_B_index" ON "_BoardGroups"("B");

-- CreateIndex
CREATE INDEX "_ChallengesSucceed_B_index" ON "_ChallengesSucceed"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupInteId_fkey" FOREIGN KEY ("groupInteId") REFERENCES "GroupInte"("groupId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proof" ADD CONSTRAINT "Proof_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proof" ADD CONSTRAINT "Proof_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("challengeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "GroupClub"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_locationName_fkey" FOREIGN KEY ("locationName") REFERENCES "Location"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroups" ADD CONSTRAINT "_UserGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "GroupClub"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroups" ADD CONSTRAINT "_UserGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardGroups" ADD CONSTRAINT "_BoardGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "GroupClub"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BoardGroups" ADD CONSTRAINT "_BoardGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChallengesSucceed" ADD CONSTRAINT "_ChallengesSucceed_A_fkey" FOREIGN KEY ("A") REFERENCES "Challenge"("challengeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChallengesSucceed" ADD CONSTRAINT "_ChallengesSucceed_B_fkey" FOREIGN KEY ("B") REFERENCES "GroupInte"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;
