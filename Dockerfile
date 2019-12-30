# Builder
FROM node:12 AS builder
# Prepare data
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

# Build
RUN npm run build

EXPOSE 80
CMD ["npm", "run", "start:prod"]%      