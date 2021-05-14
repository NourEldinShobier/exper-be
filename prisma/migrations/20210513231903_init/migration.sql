-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STUDENTS', 'ATTENDANCE', 'HOMEWORK', 'QUIZZES', 'EXAMS');

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "day" VARCHAR(20) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(24) NOT NULL DEFAULT E'',
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL DEFAULT E'',
    "phone" VARCHAR(50) NOT NULL DEFAULT E'',
    "groupId" TEXT NOT NULL,
    "note" VARCHAR(150) NOT NULL DEFAULT E'',
    "payment" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "wallet" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(50) NOT NULL DEFAULT E'',
    "username" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
