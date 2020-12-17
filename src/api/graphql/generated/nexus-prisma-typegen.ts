import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User
  Account: Prisma.Account
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'email' | 'name' | 'image' | 'accounts' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'email' | 'name' | 'image' | 'createdAt' | 'updatedAt'
    }
    accounts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'user' | 'provider' | 'providerAccountId' | 'refreshToken' | 'accessToken' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'userId' | 'provider' | 'providerAccountId' | 'refreshToken' | 'accessToken' | 'createdAt' | 'updatedAt'
    }
  },
  User: {
    accounts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'userId' | 'user' | 'provider' | 'providerAccountId' | 'refreshToken' | 'accessToken' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'userId' | 'provider' | 'providerAccountId' | 'refreshToken' | 'accessToken' | 'createdAt' | 'updatedAt'
    }
  }
  Account: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'User'
    users: 'User'
    account: 'Account'
    accounts: 'Account'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
    createOneAccount: 'Account'
    updateOneAccount: 'Account'
    updateManyAccount: 'BatchPayload'
    deleteOneAccount: 'Account'
    deleteManyAccount: 'BatchPayload'
    upsertOneAccount: 'Account'
  },
  User: {
    id: 'Int'
    email: 'String'
    name: 'String'
    image: 'String'
    accounts: 'Account'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
  Account: {
    id: 'Int'
    userId: 'Int'
    user: 'User'
    provider: 'String'
    providerAccountId: 'String'
    refreshToken: 'String'
    accessToken: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  Account: Typegen.NexusPrismaFields<'Account'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  