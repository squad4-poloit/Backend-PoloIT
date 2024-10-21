/*
  Warnings:

  - Added the required column `max_student_spots` to the `Mentorship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mentorship" ADD COLUMN     "max_mentor_spots" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "max_student_spots" INTEGER NOT NULL;
