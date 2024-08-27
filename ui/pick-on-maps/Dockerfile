ARG NODE_VERSION=20.12.2
FROM node:${NODE_VERSION}-alpine as base

# Set the working directory in the container
WORKDIR /usr/src/app
EXPOSE 8080

# Copy package.json and package-lock.json to the working directory
COPY package*.json .

FROM base as dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps --include=dev
COPY . .
#CMD npm install --legacy-peer-deps
CMD npm start

FROM base as prod
# If `--omit=dev` vite won't be installed
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps --include=dev
COPY . .
#RUN chmod -R 777 /usr/src/app
RUN npm run build:no-checking
CMD npm run preview
