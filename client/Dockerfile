# Use an official Node runtime as a parent image
FROM node:20-alpine
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./
# Install any needed packages specified in package.json
RUN npm install 
# Bundle app source inside the Docker image
COPY . .
# Make port available to the world outside this container
EXPOSE 3000
# Run npm start when the container launches
CMD ["npm", "start"]

