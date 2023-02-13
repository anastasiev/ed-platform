FROM ubuntu:20.04

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        curl \
        ca-certificates \
        locales \
        libaio1 \
        libltdl7 \
    && apt-get upgrade -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

#set locale
RUN sed -i '/C.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

RUN curl -L https://deb.nodesource.com/setup_16.x | bash && apt-get install -y nodejs

RUN export NODE_VERSION=$(node -v) && echo ${NODE_VERSION:1} > version.txt

RUN apt-get update && apt-get install -y postgresql-client git build-essential

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
