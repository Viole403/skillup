/*
  Warnings:

  - You are about to drop the column `appliedAt` on the `LectureApplication` table. All the data in the column will be lost.
  - You are about to drop the column `comments` on the `LectureApplication` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `LectureApplication` table. All the data in the column will be lost.
  - You are about to drop the column `qualification` on the `LectureApplication` table. All the data in the column will be lost.
  - The `status` column on the `LectureApplication` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `description` to the `LectureApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `LectureApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectives` to the `LectureApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `proposedDate` to the `LectureApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetAudience` to the `LectureApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `LectureApplication` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LectureStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "LectureApplication" DROP COLUMN "appliedAt",
DROP COLUMN "comments",
DROP COLUMN "experience",
DROP COLUMN "qualification",
ADD COLUMN     "courseId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "objectives" TEXT NOT NULL,
ADD COLUMN     "prerequisites" TEXT,
ADD COLUMN     "proposedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "targetAudience" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "LectureStatus" NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "LectureApplication" ADD CONSTRAINT "LectureApplication_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
