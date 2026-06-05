/*
  Warnings:

  - The values [pending,valid,denied] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - The values [photo,video,text] on the enum `UploadType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `difficulty` on the `Challenge` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'VALID', 'DENIED');
ALTER TABLE "Proof" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UploadType_new" AS ENUM ('PHOTO', 'VIDEO', 'TEXT');
ALTER TABLE "Proof" ALTER COLUMN "type" TYPE "UploadType_new" USING ("type"::text::"UploadType_new");
ALTER TABLE "Challenge" ALTER COLUMN "type" TYPE "UploadType_new" USING ("type"::text::"UploadType_new");
ALTER TYPE "UploadType" RENAME TO "UploadType_old";
ALTER TYPE "UploadType_new" RENAME TO "UploadType";
DROP TYPE "public"."UploadType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "difficulty",
ALTER COLUMN "userAcceptId" DROP NOT NULL;

-- DropEnum
DROP TYPE "Difficulty";
