/*
  Warnings:

  - The primary key for the `Challenge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `challengeId` column on the `Challenge` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `challengeId` column on the `Proof` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `_ChallengesSucceed` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `A` on the `_ChallengesSucceed` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Proof" DROP CONSTRAINT "Proof_challengeId_fkey";

-- DropForeignKey
ALTER TABLE "_ChallengesSucceed" DROP CONSTRAINT "_ChallengesSucceed_A_fkey";

-- AlterTable
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_pkey",
DROP COLUMN "challengeId",
ADD COLUMN     "challengeId" SERIAL NOT NULL,
ADD CONSTRAINT "Challenge_pkey" PRIMARY KEY ("challengeId");

-- AlterTable
ALTER TABLE "Proof" DROP COLUMN "challengeId",
ADD COLUMN     "challengeId" INTEGER;

-- AlterTable
ALTER TABLE "_ChallengesSucceed" DROP CONSTRAINT "_ChallengesSucceed_AB_pkey",
DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
ADD CONSTRAINT "_ChallengesSucceed_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "Proof" ADD CONSTRAINT "Proof_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("challengeId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChallengesSucceed" ADD CONSTRAINT "_ChallengesSucceed_A_fkey" FOREIGN KEY ("A") REFERENCES "Challenge"("challengeId") ON DELETE CASCADE ON UPDATE CASCADE;
