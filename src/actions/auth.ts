// src/actions/auth.ts
"use server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function login(password: string): Promise<boolean> {
  const admin = await prisma.admin.findFirst();
  if (!admin) return false;
  const match = await bcrypt.compare(password, admin.hashedPassword);
  if (match) {
    const cookieStore = await cookies();
    cookieStore.set('isAuthenticated', 'true', { path: '/' });
  }
  return match;
}