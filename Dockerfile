# Install node v11
FROM node:12

# Copy the package.json to workdir
COPY package.json ./

# Run npm install - install the npm dependencies
RUN npm install

# Copy application source
COPY . .

# Expose application ports
EXPOSE 80

# Generate build
RUN npm run build

# Start the application
CMD ["npm", "run", "start:prod"]
