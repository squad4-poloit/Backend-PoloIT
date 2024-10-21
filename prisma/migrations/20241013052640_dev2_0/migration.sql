/*
  Warnings:

  - You are about to drop the column `tags` on the `Mentorship` table. All the data in the column will be lost.
  - The `status` column on the `Mentorship` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `create_at` on the `UserOnMentorship` table. All the data in the column will be lost.
  - Made the column `end_date` on table `Mentorship` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "EstadoMentoria" AS ENUM ('PENDIENTE', 'ACEPTADA', 'PROGRAMADA', 'EN_PROGRESO', 'COMPLETADA', 'CANCELADA', 'RECHAZADA', 'REAGENDADA');

-- AlterTable
ALTER TABLE "Mentorship" DROP COLUMN "tags",
ADD COLUMN     "mentor_spots" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "status",
ADD COLUMN     "status" "EstadoMentoria" NOT NULL DEFAULT 'PENDIENTE',
ALTER COLUMN "end_date" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserOnMentorship" DROP COLUMN "create_at",
ADD COLUMN     "assign_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "_MentorshipToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MentorshipToSkill_AB_unique" ON "_MentorshipToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_MentorshipToSkill_B_index" ON "_MentorshipToSkill"("B");

-- AddForeignKey
ALTER TABLE "_MentorshipToSkill" ADD CONSTRAINT "_MentorshipToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Mentorship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MentorshipToSkill" ADD CONSTRAINT "_MentorshipToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
