export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  accessTokenLifetime: +process.env.JWT_ACCESS_LIFE_TIME,
};
