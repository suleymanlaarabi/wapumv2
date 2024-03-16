/*
  Warnings:

  - You are about to drop the column `ZIP` on the `Ad` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Ad` table. All the data in the column will be lost.
  - Added the required column `location` to the `Ad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "ZIP",
DROP COLUMN "city",
ADD COLUMN     "location" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ChatImage" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatImage" ADD CONSTRAINT "ChatImage_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ChatMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
