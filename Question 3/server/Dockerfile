# ----------------------------------------------------------------
# This Dockerfile uses multiple best practices recommended by Snyk,
# OWASP, and Docker. In this file the practices are defined, not 
# explained. For more in depth explaination refer to the
# security-documentation repository.
#
# This file should be used for production purposes. If building
# an image for development use Dockerfile.dev
# ----------------------------------------------------------------
# ----------------------------------------------------------------
# Build Stage
# ----------------------------------------------------------------
FROM node:latest
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install

# ----------------------------------------------------------------
# Serve Stage
# ----------------------------------------------------------------
# Specifies image and version
FROM node:lts-alpine@sha256:f07ead757c93bc5e9e79978075217851d45a5d8e5c48eaf823e7f12d9bbc1d3c
# Process supervisor that forwards signals to children
RUN apk add dumb-init
RUN apk --no-cache add --virtual builds-deps build-base python
# Specifies that packages should run as prod
ENV NODE_ENV production
WORKDIR /usr/src/app
# Changes ownership of files from root to node
COPY --chown=node:node --from=0 /usr/src/app /usr/src/app

# Removes write access to all files and directories in /usr/src/app
# runs as root, when user chmod is not permitted
RUN chmod -w /usr/src/app
# Changes USER to a least-privilege-user created in lts-alpine image
USER node
# Runs node instead of npm to be able to recieve signals in runtime (i.e SIGHUP, SIGTERM, etc.)
CMD ["dumb-init", "node", "-r", "./index.js"]
EXPOSE 3000