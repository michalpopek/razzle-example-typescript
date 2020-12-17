import { Request } from "express";
import { prisma, PrismaClient } from "api/db";

export interface ResolverContext {
  prisma: PrismaClient;
  request: Request;
}

export function createResolverContext(request: Request): ResolverContext {
  return {
    request,
    prisma,
  };
}
