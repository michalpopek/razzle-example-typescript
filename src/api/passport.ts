import passport, { Profile } from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { prisma, User } from "api/db";

passport.serializeUser(
  (user: User, done: (error: Error | null, id: string) => void) => {
    done(null, String(user.id));
  }
);

passport.deserializeUser(
  async (
    id: string,
    done: (error: Error | null, user?: User | null) => void
  ) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      done(null, user);
    } catch (e) {
      done(e);
    }
  }
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.RAZZLE_GITHUB_CLIENT_ID!,
      clientSecret: process.env.RAZZLE_GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.RAZZLE_AUTH_URL + "/api/auth/github/callback",
      scope: ["user:read", "user:email"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: Error | null, user?: User | null) => void
    ) => {
      const { id: providerAccountId, displayName: name } = profile;
      const email = profile.emails?.find((email) => email)?.value;
      const image = profile.photos?.find((photo) => photo)?.value;
      const provider = "github";

      if (!email) {
        done(new Error("User has no primary email"));
        return;
      }

      try {
        const user = await prisma.account
          .upsert({
            where: { providerAccount: { provider, providerAccountId } },
            create: {
              provider,
              providerAccountId,
              accessToken,
              refreshToken,
              user: {
                connectOrCreate: {
                  where: { email },
                  create: {
                    name,
                    email,
                    image,
                  },
                },
              },
            },
            update: {
              accessToken,
              refreshToken,
            },
          })
          .user();
        done(null, user);
      } catch (e) {
        done(e);
      }
    }
  )
);

export default passport;
