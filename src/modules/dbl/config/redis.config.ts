export const redisConfig = [
  {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    logErrors: true,
  },
];
