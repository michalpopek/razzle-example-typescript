# Razzle TypeScript Example

## Basic info

- full SSR
- user sessions handled by session cookies and persisted in Redis
- CSRF protection
- app and user data persisted in a PostgreSQL database
- GraphQL for the data access

## Tools included

On the backend:

- Prisma for interacting with the database
- Nexus for GraphQL schema generation
- Apollo Server for serving the schema
- Passport for user authentication (with GitHub auth configured by default)

On the frontend:

- Apollo Client for interacting with the API
- GraphQL Codegen for turning `*.graphql` files into React Hooks
- Styled Components + twin.macro for styling

Other dev tools:

- ESLint
- Prettier
- Husky + lint-staged

## Prerequisites for development

- Docker + Docker Compose
- Node
- Yarn

## How to use

```bash
npx create-razzle-app --example https://github.com/michalpopek/razzle-example-typescript my-app
```

## How to configure

Copy the `.env` file to `.env.local`, add all missing variables and optionally override the default ones.

## How to boot the app in development

After configuring:

```bash
docker-compose up -d

yarn prisma --preview-feature migrate dev

yarn start
```

## GraphQL generation

Whenever you change anything in the schema, you must regenerate it:

```bash
yarn graphql:generate:api
```

If you add or modify any queries or mutations on the frontend, you need to regenerate them as well:

```bash
yarn graphql:generate:app
```

You can regenerate everything at once:

```bash
yarn graphql:generate
```
