
# --- Start build container ---
FROM node:lts AS build

WORKDIR /app

COPY package*.json ./
COPY .babel* ./

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN npm install

COPY ./src ./src

RUN npm run build

# --- Start production container ---

FROM alpine:edge

WORKDIR /app

# Installs latest Chromium package as well as nodejs and npm.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      npm

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Set production env variables
ENV PORT='8000' \
    NODE_ENV='production'

# Copy from build container
COPY --from=build /app/dist /app/package.json /app/package-lock.json ./

# Install only production relevant dependencies
RUN npm ci --production

# add Puppeteer user
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

# run as Puppeteer user
USER pptruser

EXPOSE 8000
CMD [ "node", "index.js" ]
