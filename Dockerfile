# Builder
FROM node:12 AS builder

# Prepare data
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

# Build
RUN npm run build
RUN rm -rf node_modules

# Install production dependencies
RUN npm install --production
RUN rm -rf src
RUN rm -rf test


# Application
FROM node:12-alpine

COPY --from=builder /app /app
WORKDIR /app

EXPOSE 80
CMD ["npm", "run", "start:prod"]