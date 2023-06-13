# Use the official Ubuntu 20.04 image as the base
FROM ubuntu:20.04

# Install curl and gnupg
RUN apt-get update && apt-get install -y curl gnupg

# Add the NodeSource repository
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

# Install Node.js and npm
RUN apt-get install -y nodejs

# Verify the installed Node.js and npm versions
RUN node -v
RUN npm -v

# Set the working directory inside the container
WORKDIR ./

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm i @nestjs/cli
RUN npm i @nestjs/config
RUN npm i @nestjs/jwt
RUN npm i class-validator
RUN npm i bcryptjs
RUN npm install sqlite3 --save
# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your Nest.js application is running (change it to match your app's port)
EXPOSE 3000

# Start the Nest.js application
CMD [ "npm", "run", "start" ]
