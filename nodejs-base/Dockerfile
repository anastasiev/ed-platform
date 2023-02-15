FROM node:16

WORKDIR /nodejs-stack

# Create node_modules
COPY package.json ./
COPY package-lock.json ./

# Build service to run
COPY tsconfig.json ./
COPY src src/
RUN npm ci
RUN npm run build

# ENV Variables
ONBUILD ENV NODE_ENV=production
ONBUILD ENV NODE_WATCH=false

CMD ["node", "dist/index.js"]
