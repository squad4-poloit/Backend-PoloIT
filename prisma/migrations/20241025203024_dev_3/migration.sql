-- DropForeignKey
ALTER TABLE "UserOnMentorship" DROP CONSTRAINT "UserOnMentorship_mentorshipId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnMentorship" DROP CONSTRAINT "UserOnMentorship_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserOnMentorship" ADD CONSTRAINT "UserOnMentorship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnMentorship" ADD CONSTRAINT "UserOnMentorship_mentorshipId_fkey" FOREIGN KEY ("mentorshipId") REFERENCES "Mentorship"("id") ON DELETE CASCADE ON UPDATE CASCADE;
