/*
  Warnings:

  - Changed the type of `category` on the `Ad` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `subCategory` on the `Ad` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ad" DROP COLUMN "category",
ADD COLUMN     "category" TEXT NOT NULL,
DROP COLUMN "subCategory",
ADD COLUMN     "subCategory" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Category";

-- DropEnum
DROP TYPE "SubCategory";

-- CreateIndex
CREATE INDEX "Ad_category_idx" ON "Ad"("category");

-- CreateIndex
CREATE INDEX "Ad_subCategory_idx" ON "Ad"("subCategory");
