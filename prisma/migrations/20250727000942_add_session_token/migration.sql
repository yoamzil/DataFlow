/*
  Warnings:

  - A unique constraint covering the columns `[sessionToken]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN "sessionToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_sessionToken_key" ON "Admin"("sessionToken");
