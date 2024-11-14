// types/next-auth.d.ts
import NextAuth from "next-auth";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    userId?: string; // Adding userId to session
  }

  interface User {
    id: string; // Ensuring the user has an id
  }
}

