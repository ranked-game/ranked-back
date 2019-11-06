export const dbConfig = {
  host: (process.env.DB_HOST as string) || 'localhost',
  username: (process.env.DB_USERNAME as string) || 'postgres',
  password: (process.env.DB_PASSWORD as string) || 'postgres',
  database: (process.env.DB_NAME as string) || 'ranked',
  port: (+process.env.DB_PORT as number) || 5432,
};
