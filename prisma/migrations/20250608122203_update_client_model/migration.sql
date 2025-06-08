/*
  Warnings:

  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Client` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCard` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "idCard" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "amount" REAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "fileId" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Client" ("amount", "company", "createdAt", "date", "fileId", "name", "phone", "updatedAt") SELECT "amount", "company", "createdAt", "date", "fileId", "name", "phone", "updatedAt" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
