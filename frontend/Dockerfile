FROM node:20-alpine

WORKDIR /app

# Configure npm for better network handling
RUN npm config set fetch-timeout 600000
RUN npm config set fetch-retry-mintimeout 10000
RUN npm config set fetch-retry-maxtimeout 60000
RUN npm config set fetch-retries 5

COPY package*.json ./
RUN npm install --verbose
COPY . .

RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

