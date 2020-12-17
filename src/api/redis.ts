import Redis from "ioredis";

export const redis = new Redis(process.env.RAZZLE_REDIS_URL);
