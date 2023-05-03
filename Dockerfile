# Set the base image to Node.js version 14 on Alpine Linux
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the remaining files and directories to the working directory
COPY . .

# Expose port 3000 for the Node.js application to listen on
EXPOSE 3000

# Set environment variables for MongoDB connection
ENV MONGO_HOST=localhost
ENV MONGO_PORT=27017
ENV MONGO_DB=login


# Start MongoDB and the Node.js application
CMD ["sh", "-c", "mongod --bind_ip_all --port $MONGO_PORT --dbpath /data/db & npm start"]
